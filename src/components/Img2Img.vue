<template>
  <div class="container">
    <n-space vertical>
      <n-space>
        <n-button v-if="resultImage" @click="onContinueClick">继续美化</n-button>
        <n-button v-if="resultImage" @click="onUploadClick">换张照片</n-button>
      </n-space>
      <n-card>
        <div v-if="resultImage" class="image-container">
          <img :src="resultImage" alt="Result"/>
        </div>
        <div v-else class="placeholder">
          <n-spin v-if="loading" size="large"/>
          <n-button v-else @click="onUploadClick">点击上传照片</n-button>
        </div>
      </n-card>
      <n-card>
        <div v-if="originalImage" class="image-container">
          <img :src="originalImage" alt="Original"/>
        </div>
        <div v-else class="placeholder">
          <span>请先上传照片</span>
        </div>
      </n-card>
    </n-space>
    <input type="file" ref="fileInput" @change="onFileChange" style="display: none" accept="image/png, image/jpeg"/>
    <n-modal v-model:show="showStyleModel"
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
          <div class="svgBox" style="background-color: #6c8be5" @click="img2img('3dboy')">
            <svg style="width: 40px;color: #ffffff;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 1024 1024">
              <path
                  d="M874 120H622c-3.3 0-6 2.7-6 6v56c0 3.3 2.7 6 6 6h160.4L583.1 387.3c-50-38.5-111-59.3-175.1-59.3c-76.9 0-149.3 30-203.6 84.4S120 539.1 120 616s30 149.3 84.4 203.6C258.7 874 331.1 904 408 904s149.3-30 203.6-84.4C666 765.3 696 692.9 696 616c0-64.1-20.8-124.9-59.2-174.9L836 241.9V402c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V150c0-16.5-13.5-30-30-30zM408 828c-116.9 0-212-95.1-212-212s95.1-212 212-212s212 95.1 212 212s-95.1 212-212 212z"
                  fill="currentColor"></path>
            </svg>
          </div>
          <div class="svgBox"
               style="background-color: #ffa8a8"
               @click="img2img('3dboy')">
            <svg style="width: 40px;color: #ffffff;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 1024 1024">
              <path
                  d="M712.8 548.8c53.6-53.6 83.2-125 83.2-200.8c0-75.9-29.5-147.2-83.2-200.8C659.2 93.6 587.8 64 512 64s-147.2 29.5-200.8 83.2C257.6 200.9 228 272.1 228 348c0 63.8 20.9 124.4 59.4 173.9c7.3 9.4 15.2 18.3 23.7 26.9c8.5 8.5 17.5 16.4 26.8 23.7c39.6 30.8 86.3 50.4 136.1 57V736H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h114v140c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V812h114c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H550V629.5c61.5-8.2 118.2-36.1 162.8-80.7zM512 556c-55.6 0-107.7-21.6-147.1-60.9C325.6 455.8 304 403.6 304 348s21.6-107.7 60.9-147.1C404.2 161.5 456.4 140 512 140s107.7 21.6 147.1 60.9C698.4 240.2 720 292.4 720 348s-21.6 107.7-60.9 147.1C619.7 534.4 567.6 556 512 556z"
                  fill="currentColor"></path>
            </svg>
          </div>
          <!--          <n-button @click="img2img('3dboy')">帅哥</n-button>-->
          <!--          <n-button @click="img2img('3dgirl')">美女</n-button>-->
        </n-space>
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import {defineComponent, ref} from 'vue'
import axios from "axios";
import imageCompression from 'browser-image-compression';

export default defineComponent({
  setup() {
    const fileInput = ref(null)
    const originalImage = ref(null)
    const resultImage = ref(null)
    const loading = ref(false)
    const showStyleModel = ref(false)
    const style = ref(null)

    const onUploadClick = () => {
      resultImage.value = null;
      originalImage.value = null;
      fileInput.value.value = null;
      fileInput.value.click()
    }

    const img2img = (chooseStyle) => {
      style.value = chooseStyle;
      loading.value = true;
      showStyleModel.value = false;
      axios.post('/sd/sdapi/v1/img2img', {
        // "prompt": "masterpiece, best quality,realistic, 3d,solo,1boy",
        // "negative_prompt": "(cross-eyed:1.5),EasyNegative,wrinkled skin,  drawn by bad-artist, sketch by bad-artist-anime, (bad_prompt:0.8), (artist name, signature, watermark:1.4), (ugly:1.2), (worst quality, poor details:1.4), bad-hands-5, badhandv4, blurry, blush, red_face",
        "styles": [
          style.value
        ],
        "init_images": [
          originalImage.value
        ],
        "steps": 30,
        "cfg_scale": 10,
        "seed": -1,
        "refiner_checkpoint": "",
        "refiner_switch_at": 0.8,
        "width": 512,
        "height": 704,
        "denoising_strength": 0.2,
        "image_cfg_scale": 1.5,
        "sampler_name": "DPM++ 2M Karras",
        "include_init_images": false,
        "send_images": true,
        "save_images": false,
        "do_not_save_samples": true,
        "do_not_save_grid": true,
        "disable_extra_networks": true,
        // "subseed": -1,
        // "subseed_strength": 0,
        // "seed_resize_from_h": -1,
        // "seed_resize_from_w": -1,
        // "sampler_index": "DPM",
        // "batch_size": 1,
        // "n_iter": 1,
        // "restore_faces": true,
        // "tiling": true,
        // "eta": 0,
        // "s_min_uncond": 0,
        // "s_churn": 0,
        // "s_tmax": 0,
        // "s_tmin": 0,
        // "s_noise": 0,
        // "override_settings": {},
        // "override_settings_restore_afterwards": true,
        // "comments": {},
        // "resize_mode": 2,
        // "mask": "string",
        // "mask_blur_x": 4,
        // "mask_blur_y": 4,
        // "mask_blur": 0,
        // "inpainting_fill": 0,
        // "inpaint_full_res": true,
        // "inpaint_full_res_padding": 0,
        // "inpainting_mask_invert": 0,
        // "initial_noise_multiplier": 0,
        // "latent_mask": "string",
        // "force_task_id": "string",
        // "script_name": "string",
        // "script_args": [],
        // "alwayson_scripts": {}
      })
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            resultImage.value = 'data:image/png;base64,' + response.data.images[0];
            loading.value = false;
          })
          .catch(function (error) {
            console.log(error);
          });
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
            originalImage.value = e.target.result
            showStyleModel.value = true;
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
      showStyleModel,
      onUploadClick,
      onContinueClick,
      onFileChange,
      img2img
    }
  }
});
</script>

<style scoped>
.svgBox {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
}
</style>