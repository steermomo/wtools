<template>
  <div id="app">
    <h1>图片灰度转换与二值化</h1>

    <!-- 图片上传 -->
    <input type="file" @change="loadImage" accept="image/*" />

    <!-- 阈值调整 -->
    <label for="threshold">二值化阈值: {{ threshold }}</label>
    <input
      type="range"
      id="threshold"
      v-model="threshold"
      min="0"
      max="255"
    />

    <!-- 点击按钮生成结果 -->
    <button @click="applyThreshold">重新生成二值化图片</button>

    <!-- 显示原始图片 -->
    <h2>原始图片</h2>
    <img :src="imageSrc" v-if="imageSrc" alt="Uploaded Image" />

    <!-- 显示处理后的图片 -->
    <h2>处理后的图片</h2>
    <canvas ref="canvas" v-if="imageSrc"></canvas>
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
</style>
