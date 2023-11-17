<template>
  <div class="container">
    <n-space vertical>
      <n-card>
        <div class="input-container">
          <n-input v-model:value="inputText" placeholder="请输入文字"/>
        </div>
      </n-card>
      <n-button :disabled="inputText === null" v-if="resultImage === null" @click="onGenerateClick">点击生成图片</n-button>
      <n-button v-if="resultImage" @click="onGenerateClick">重新生成</n-button>
      <n-card>
        <div v-if="resultImage" class="image-container">
          <img :src="resultImage" alt="Result"/>
        </div>
        <div v-else class="placeholder">
          <n-spin v-if="loading" size="large"/>
        </div>
      </n-card>
    </n-space>
  </div>
</template>
<script>
import {defineComponent, ref} from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const inputText = ref(null)
    const resultImage = ref(null)
    const loading = ref(false)


    const txt2img = () => {
      axios.post('/sd/sdapi/v1/txt2img', {
        "prompt": inputText.value,
        "negative_prompt": "NSFW,EasyNegative, drawn by bad-artist, sketch by bad-artist-anime, (bad_prompt:0.8), (artist name, signature, watermark:1.4), (ugly:1.2), (worst quality, poor details:1.4), bad-hands-5, badhandv4, blurry, blush",
        // "styles": [
        //     "string"
        // ],
        "steps": 30,
        "cfg_scale": 10,
        "seed": -1,
        "refiner_checkpoint": "realcartoon3d_v30.safetensors",
        "width": 512,
        "height": 704,
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
        "force_task_id": "string",
        "sampler_index": "Euler",
        "denoising_strength": 0,
        "enable_hr": false,
        "firstphase_width": 0,
        "firstphase_height": 0,
        "hr_scale": 2,
        "hr_upscaler": "string",
        "hr_second_pass_steps": 0,
        "hr_resize_x": 0,
        "hr_resize_y": 0,
        "hr_checkpoint_name": "",
        "hr_sampler_name": "",
        "hr_prompt": "",
        "hr_negative_prompt": "",

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
    const onGenerateClick = () => {
      loading.value = true;
      txt2img();
    }

    return {
      inputText,
      resultImage,
      loading,
      onGenerateClick
    }
  }
})
</script>

<style scoped>
.container {
  max-width: 512px;
  margin: 0 auto;
}

.image-container {
  position: relative;
  width: 100%;
}

.input-container {
  position: relative;
  width: 100%;
}

.image-container img {
  width: 100%;
  object-fit: contain;
}


.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #ccc;
  border: 1px dashed #ccc;
}
</style>