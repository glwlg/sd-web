<template>
  <div class="container">
    <n-space vertical>
      <n-space>
        <n-button :focusable="false" @click="chooseStyle('Q')" :color="style==='Q'?'#fd7171':''">Q 版</n-button>
        <n-button :focusable="false" @click="chooseStyle('Comic')" :color="style==='Comic'?'#fd7171':''">漫画</n-button>
        <n-button :focusable="false" @click="chooseStyle('Beauty')" :color="style==='Beauty'?'#fd7171':''">换脸
        </n-button>
<!--        <n-button :focusable="false" @click="chooseStyle('plus')" :color="style==='plus'?'#fd7171':''">扩图-->
<!--        </n-button>-->
      </n-space>
      <n-space vertical>
        <n-tooltip trigger="hover">
          <template #trigger>
            <div style="color: #ffffff;font-size: 15px;">调整幅度: {{ denoisingStrength }}%</div>
          </template>
          幅度越小越像照片本人
        </n-tooltip>
        <n-slider v-model:value="denoisingStrength" :step="1" :min="minDenoisingStrength" :max="60"/>
      </n-space>

      <n-space>
        <n-button :disabled="!resultImage" @click="reImg">重新生成</n-button>
        <!--        <n-button v-if="resultImage" @click="onContinueClick">继续美化</n-button>-->
        <n-button :disabled="!resultImage" @click="onUploadClick">换张照片</n-button>
      </n-space>

      <div :class="{ loader: true, loadAnimate: loading,loadFinish:resultImage }">
          <n-card>
            <div v-if="originalImage" class="image-container">
              <!--          <img :src="resultImage" alt="Result"/>-->
              <transition name="fade" mode="out-in">
                <img v-if="resultImage" :src="resultImage" alt="Result"/>
                <img v-else :src="originalImage" alt="Original"/>
              </transition>
            </div>
            <div v-else class="placeholder">
              <n-spin v-if="loading" size="large"/>
              <n-button v-else @click="onUploadClick">点击上传照片</n-button>
            </div>
          </n-card>
      </div>
      <!--      <n-card>-->
      <!--        <div v-if="resultImage" class="image-container">-->
      <!--          <img :src="resultImage" alt="Result"/>-->
      <!--        </div>-->
      <!--        <div v-else class="placeholder">-->
      <!--          <n-spin v-if="loading" size="large"/>-->
      <!--          <n-button v-else @click="onUploadClick">点击上传照片</n-button>-->
      <!--        </div>-->
      <!--      </n-card>-->
      <!--      <n-card>-->
      <!--        <div v-if="originalImage" class="image-container">-->
      <!--          <img :src="originalImage" alt="Original"/>-->
      <!--        </div>-->
      <!--        <div v-else class="placeholder">-->
      <!--          <span>请先上传照片</span>-->
      <!--        </div>-->
      <!--      </n-card>-->
    </n-space>
    <input type="file" ref="fileInput" @change="onFileChange" style="display: none" accept="image/png, image/jpeg"/>
    <n-modal v-model:show="showSexModel"
             :mask-closable="false"
             role="card"
             style="padding: 0"
    >
      <n-card
          style="width: 300px"
          :bordered="false"
          size="huge"
          aria-modal="true"
      >
        <n-space justify="space-between">
          <div class="svgBox" style="background-color: #6c8be5" @click="chooseSex('Boy')">
            <svg style="width: 40px;color: #ffffff;" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 1024 1024">
              <path
                  d="M874 120H622c-3.3 0-6 2.7-6 6v56c0 3.3 2.7 6 6 6h160.4L583.1 387.3c-50-38.5-111-59.3-175.1-59.3c-76.9 0-149.3 30-203.6 84.4S120 539.1 120 616s30 149.3 84.4 203.6C258.7 874 331.1 904 408 904s149.3-30 203.6-84.4C666 765.3 696 692.9 696 616c0-64.1-20.8-124.9-59.2-174.9L836 241.9V402c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V150c0-16.5-13.5-30-30-30zM408 828c-116.9 0-212-95.1-212-212s95.1-212 212-212s212 95.1 212 212s-95.1 212-212 212z"
                  fill="currentColor"></path>
            </svg>
          </div>
          <div class="svgBox"
               style="background-color: #ffa8a8"
               @click="chooseSex('Girl')">
            <svg style="width: 40px;color: #ffffff;" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 1024 1024">
              <path
                  d="M712.8 548.8c53.6-53.6 83.2-125 83.2-200.8c0-75.9-29.5-147.2-83.2-200.8C659.2 93.6 587.8 64 512 64s-147.2 29.5-200.8 83.2C257.6 200.9 228 272.1 228 348c0 63.8 20.9 124.4 59.4 173.9c7.3 9.4 15.2 18.3 23.7 26.9c8.5 8.5 17.5 16.4 26.8 23.7c39.6 30.8 86.3 50.4 136.1 57V736H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h114v140c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V812h114c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H550V629.5c61.5-8.2 118.2-36.1 162.8-80.7zM512 556c-55.6 0-107.7-21.6-147.1-60.9C325.6 455.8 304 403.6 304 348s21.6-107.7 60.9-147.1C404.2 161.5 456.4 140 512 140s107.7 21.6 147.1 60.9C698.4 240.2 720 292.4 720 348s-21.6 107.7-60.9 147.1C619.7 534.4 567.6 556 512 556z"
                  fill="currentColor"></path>
            </svg>
          </div>
        </n-space>
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import {defineComponent, nextTick, reactive, ref, watch} from 'vue'
import axios from "axios";
import imageCompression from 'browser-image-compression';
import Img2imgConfig from '../model/Img2imgConfig';
import Style from '../model/StyleMap.js';

export default defineComponent({
      setup() {
        const fileInput = ref(null)
        const originalImage = ref(null)
        const maskImage = ref(null)
        const resultImage = ref(null)
        const loading = ref(false)
        const showSexModel = ref(false)
        const style = ref('Q')
        const width = ref(512)
        const height = ref(704)
        const denoisingStrength = ref(50)
        const minDenoisingStrength = ref(40)
        const sex = ref(null)

        const chooseStyle = (chooseStyle) => {
          style.value = chooseStyle;
          if (chooseStyle === 'Q') {
            denoisingStrength.value = 50;
            minDenoisingStrength.value = 40;
          } else if (chooseStyle === 'Comic') {
            denoisingStrength.value = 40;
            minDenoisingStrength.value = 40;
          } else if (chooseStyle === 'plus') {
            denoisingStrength.value = 50;
            minDenoisingStrength.value = 50;
          } else {
            denoisingStrength.value = 30;
            minDenoisingStrength.value = 10;
          }
        }
        const chooseSex = (chooseSex) => {
          sex.value = chooseSex;
          img2img();
        }
        const img2img = () => {
          // resultImage.value = null;
          loading.value = true;
          showSexModel.value = false;
          let styleName = style.value + sex.value;

          let imgConfig = new Img2imgConfig(Style[styleName], originalImage.value, maskImage.value);

          imgConfig.width = width.value
          imgConfig.height = height.value
          imgConfig.denoising_strength = denoisingStrength.value / 100
          axios.post('/sd/sdapi/v1/img2img', imgConfig)
              .then(function (response) {
                resultImage.value = 'data:image/png;base64,' + response.data.images[0];
                loading.value = false;
              })
              .catch(function (error) {
                console.log(error);
              });
        }

        const reImg = async () => {
          resultImage.value = null;
          await nextTick(() => {
            img2img();
          });
        }

        const onUploadClick = () => {
          resultImage.value = null;
          originalImage.value = null;
          fileInput.value.value = null;
          fileInput.value.click()
        }
        const onFileChange = async (event) => {
          const file = event.target.files[0]
          if (file) {
            const options = {
              maxSizeMB: 1,          // (default: Number.POSITIVE_INFINITY)
              maxWidthOrHeight: 1024,  // (default: undefined)
              useWebWorker: true,      // (default: true)
              maxIteration: 10,       // (default: 10)
              exifOrientation: true,  // (default: false)
              onProgress: undefined, // (default: null) hook function to log progress
              initialQuality: 0.8    // (default: 0.92)
            }
            try {
              const compressedFile = await imageCompression(file, options);
              const reader = new FileReader()
              reader.onload = (e) => {
                let img = new Image();
                img.onload = function () {
                  console.log('Image Width: ' + this.width + ', Image Height: ' + this.height);
                  if (this.width <= 512) {
                    width.value = this.width;
                    height.value = this.height;
                  } else {
                    height.value = width.value / this.width * this.height;
                  }
                  originalImage.value = e.target.result;
                  showSexModel.value = true;

                  if (style.value === 'plus') {
                    // 创建新的canvas元素
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    // 设置canvas的宽高为原图的2倍
                    canvas.width = img.width * 2;
                    canvas.height = img.height * 2;

                    // 设置画布的背景色为白色
                    context.fillStyle = '#FFFFFF';

                    // 填充整个画布
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    // 将原图画在画布的中间
                    context.drawImage(img, img.width / 2, img.height / 2);

                    originalImage.value = canvas.toDataURL('image/png');



                    // 设置透明矩形的位置和大小
                    const rectX = img.width / 2;
                    const rectY = img.height / 2;
                    const rectWidth = img.width;
                    const rectHeight = img.height;

                    // 在画布上绘制一个透明的矩形
                    context.clearRect(rectX, rectY, rectWidth, rectHeight);

                    // 将canvas转换为图片
                    const newImg = document.createElement('img');
                    newImg.src = canvas.toDataURL('image/png');


                    maskImage.value = canvas.toDataURL('image/png');

                    // 将新的图片添加到页面中
                    // document.body.appendChild(newImg);
                  }
                }
                img.src = e.target.result;
              }
              reader.readAsDataURL(compressedFile)
            } catch (error) {
              console.log(error);
            }
          }
        }

        const onContinueClick = () => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          originalImage.value = resultImage.value;
          resultImage.value = null;
          img2img(style.value);
        }


        return {
          fileInput,
          originalImage,
          resultImage,
          loading,
          style,
          showSexModel,
          denoisingStrength,
          minDenoisingStrength,
          onUploadClick,
          onContinueClick,
          onFileChange,
          chooseStyle,
          chooseSex,
          img2img,
          reImg
        }
      }
    }
)
;
</script>

<style lang="scss" scoped>
.svgBox {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}


.loader {
  position: relative;
  margin: auto;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
  padding: 4px;
}

.loadAnimate::before {
  transform: rotateZ(0deg) translate(0%, -0%) !important;
  transition: transform 15s;
}

.loadFinish::before {
  position: absolute;
  transform: rotateZ(-90deg) translate(-100%, -100%) !important;
  transition: transform 0s !important;
}

.loader::before { //稍大的元素进行位移旋转
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ba0000;
  transform: rotateZ(-90deg) translate(-100%, -100%);
  transform-origin: top left;
  transition-timing-function: linear;
}

</style>