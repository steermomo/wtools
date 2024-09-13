<template>
<div id="image-binary">
    <v-container class="">
        <v-row align="start" justify="center" style="padding-top: 1em;">
            <v-col>
                <v-file-input label="Img" variant="solo" @change="loadImage"></v-file-input>
            </v-col>

        </v-row>
        <v-row justify="center" align="center">
            <label for="threshold">
                Threshold: {{ threshold }}
            </label>
        </v-row>
        <v-row justify="center" align="center">
            <v-col justify="center" align="center">
                <v-slider type="range" id="threshold" v-model="thresholdValue" min="0" max="255" style="width: 30%;"></v-slider>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">
            <v-col>
                <v-btn prepend-icon="home" variant="tonal" @click="drawAndProcessImage">
                    压扁
                </v-btn>
            </v-col>
        </v-row>

    </v-container>

    <v-divider></v-divider>

    <v-row>
        <v-col>
            <h2>Before</h2>
            <img :src="imageSrc" v-if="imageSrc" alt="Uploaded Image" class="responsive-img" />
        </v-col>
        <v-col>
            <h2>After</h2>
            <canvas ref="canvas" v-if="imageSrc" class="responsive-canvas"></canvas>
        </v-col>
    </v-row>

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
                        this.initializeCanvas();
                        this.drawAndProcessImage();
                    });
                };
                reader.readAsDataURL(file);
            }
        },

        initializeCanvas() {
            this.canvas = this.$refs.canvas;
            this.context = this.canvas.getContext('2d');
        },

        drawAndProcessImage() {
            if (this.context && this.imageSrc) {
                const img = new Image();
                img.src = this.imageSrc;
                img.onload = () => {
                    this.canvas.width = img.width;
                    this.canvas.height = img.height;
                    this.context.drawImage(img, 0, 0);
                    this.applyThreshold(); // 绘制图像后立即应用阈值处理
                };
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

                const threshold = this.threshold;
                const length = data.length;
                let i = 0;

                while (i < length) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
                    const binary = gray > threshold ? 255 : 0;
                    data[i] = data[i + 1] = data[i + 2] = binary;
                    i += 4;
                }
                // 更新 canvas 上的图像
                this.context.putImageData(imgData, 0, 0);
            }
        }
    },
};
</script>

<style scoped>
#app {
    text-align: center;
}

canvas {
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
