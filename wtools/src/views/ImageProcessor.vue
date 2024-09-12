<template>
  <div id="image-binary">
    <!-- <h1>水印二向箔</h1> -->

    <!-- 图片上传 -->
    <v-container class="">
      <v-row align="start" style="height: 150px;padding-top: 5em;" no-gutters>
        <v-col>
          <v-file-input label="Img" variant="solo" @change="loadImage"></v-file-input>
        </v-col>

      </v-row>
      <label for="threshold">Threshold: {{ threshold }}</label>
      <v-row justify="space-around" style="width: 60%">
        <v-col>
          <v-slider type="range" id="threshold" v-model="thresholdValue" min="0" max="255"></v-slider>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn prepend-icon="$vuetify" variant="tonal" @click="applyThreshold">
          Pia
        </v-btn>
      </v-row>
    </v-container>

    <!-- 显示处理后的图片 -->
    <h2>After</h2>
    <canvas ref="canvas" v-if="imageSrc" class="responsive-canvas"></canvas>

    <!-- 显示原始图片 -->
    <h2>Origin</h2>
    <img :src="imageSrc" v-if="imageSrc" alt="Uploaded Image" class="responsive-img" />


  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: null, // 图片的源
      threshold: 128, // 默认阈值
      canvas: null, // Canvas 元素
      context: null, // Canvas 上下文
    };
  },
  computed: {
    thresholdValue: {
      get() {
        return this.threshold;
      },
      set(value) {
        this.threshold = Math.round(value);
      }
    }
  },
  methods: {
    loadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result; // 保存图片路径
          this.$nextTick(() => {
            this.canvas = this.$refs.canvas;
            this.context = this.canvas.getContext('2d');
            const img = new Image();
            img.src = this.imageSrc;
            img.onload = () => {
              this.canvas.width = img.width;
              this.canvas.height = img.height;
              this.context.drawImage(img, 0, 0);
              this.applyThreshold(); // 初始化时应用阈值
            };
          });
        };
        reader.readAsDataURL(file);
      }
    },

    applyThreshold() {
      if (this.context && this.imageSrc) {
        // 清空 canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 从imageSrc 中加载图像
        const img = new Image();
        img.src = this.imageSrc;
        img.onload = () => {
          this.canvas.width = img.width;
          this.canvas.height = img.height;
          this.context.drawImage(img, 0, 0);
          const imgData = this.context.getImageData(
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
          const data = imgData.data;

          // 将图像转换为灰度并应用二值化
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            const binary = gray > this.threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = binary;
          }

          // 更新 canvas 上的图像
          this.context.putImageData(imgData, 0, 0);
        }
      }
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}

canvas {
  margin-top: 20px;
  border: 1px solid #000;
}

.responsive-canvas {
  width: 100%;
  max-width: 100%;
}

.responsive-img {
  width: 100%;
  max-width: 100%;
}
</style>
