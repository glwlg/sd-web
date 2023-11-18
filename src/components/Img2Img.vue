<template>
  <div class="container">
    <n-space vertical>
      <n-card>
        <div v-if="resultImage" class="image-container">
          <img :src="resultImage" alt="Result"/>
        </div>
        <div v-else class="placeholder">
          <n-spin v-if="loading" size="large"/>
          <n-button v-else @click="onUploadClick">点击上传照片</n-button>
        </div>
      </n-card>
      <n-button v-if="resultImage" @click="onContinueClick">继续美化</n-button>
      <n-button v-if="resultImage" @click="onUploadClick">换张照片</n-button>
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
  </div>
</template>
<script>
import {ref} from 'vue'
import axios from "axios";

export default {
  setup() {
    const fileInput = ref(null)
    const originalImage = ref(null)
    const resultImage = ref(null)
    const loading = ref(false)

    const onUploadClick = () => {
      fileInput.value.click()
    }

    const img2img = () => {
      axios.post('/sd/sdapi/v1/img2img', {
        "prompt": "masterpiece, best quality, glasses,looking away,  (wide-eyed:1.2),1boy,realistic, 3d,",
        "negative_prompt": "(NSFW:2),(sexy:2),(cross-eyed:1.5),EasyNegative, drawn by bad-artist, sketch by bad-artist-anime, (bad_prompt:0.8), (artist name, signature, watermark:1.4), (ugly:1.2), (worst quality, poor details:1.4), bad-hands-5, badhandv4, blurry, blush, red_face",
        // "styles": [
        //     "string"
        // ],
        "init_images": [
          originalImage.value
        ],
        "steps": 30,
        "cfg_scale": 10,
        "seed": -1,
        "refiner_checkpoint": "realcartoon3d_v30.safetensors",
        "width": 512,
        "height": 704,
        "denoising_strength": 0.35,
        "subseed": -1,
        "subseed_strength": 0,
        "seed_resize_from_h": -1,
        "seed_resize_from_w": -1,
        "sampler_name": "DPM++ 2S a",
        "batch_size": 1,
        "n_iter": 1,
        "restore_faces": true,
        "tiling": true,
        "do_not_save_samples": false,
        "do_not_save_grid": false,
        "eta": 0,
        "s_min_uncond": 0,
        "s_churn": 0,
        "s_tmax": 0,
        "s_tmin": 0,
        "s_noise": 0,
        "override_settings": {},
        "override_settings_restore_afterwards": true,
        "refiner_switch_at": 0,
        "disable_extra_networks": false,
        "comments": {},
        "resize_mode": 2,
        "image_cfg_scale": 1.5,
        // "mask": "string",
        "mask_blur_x": 4,
        "mask_blur_y": 4,
        "mask_blur": 0,
        "inpainting_fill": 0,
        "inpaint_full_res": true,
        "inpaint_full_res_padding": 0,
        "inpainting_mask_invert": 0,
        "initial_noise_multiplier": 0,
        // "latent_mask": "string",
        // "force_task_id": "string",
        "sampler_index": "Euler",
        "include_init_images": false,
        // "script_name": "string",
        // "script_args": [],
        "send_images": true,
        "save_images": false,
        "alwayson_scripts": {}
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
    const onFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          resultImage.value = null;
          originalImage.value = e.target.result
          loading.value = true;
          img2img();
        }
        reader.readAsDataURL(file)
      }
    }

    const onContinueClick = () => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      loading.value = true;
      originalImage.value = resultImage.value;
      resultImage.value = null;
      img2img();
    }

    return {
      fileInput,
      originalImage,
      resultImage,
      loading,
      onUploadClick,
      onContinueClick,
      onFileChange
    }
  }
}
</script>

<style scoped>


</style>