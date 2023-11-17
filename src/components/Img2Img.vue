<template>
    <div style="height: 85vh; position: relative">

        <n-layout position="absolute">
            <n-layout-header style="height: 64px; padding: 24px" bordered>
                照片风格转换
            </n-layout-header>
            <n-layout embedded content-style="padding: 24px;">
                <n-grid x-gap="6" :cols="2">
                    <n-gi>
                        <n-card bordered size="medium">
                            <n-upload
                                    action=""
                                    :show-file-list="false"
                                    :default-upload="false"
                                    @change="handleChange"
                            >
                                <div style="height: 250px">
                                    <n-image v-if="uploadImg" preview-disabled width="200" :src="uploadImg" accept="image/png, image/jpeg"/>
                                    <div v-else>点击上传照片</div>
                                </div>
                            </n-upload>
                        </n-card>
                    </n-gi>
                    <n-gi>
                        <n-card bordered size="medium">
                            <div style="height: 250px">
                                <n-spin v-if="loading" size="large"/>
                                <div v-else>
                                    <n-image v-if="resultImg" preview-disabled width="200" :src="resultImg"/>
                                    <div v-else>请上传照片</div>
                                </div>
                            </div>

                        </n-card>
                    </n-gi>
                </n-grid>
            </n-layout>
        </n-layout>
    </div>
</template>


<script>

import axios from 'axios';

export default {
    data() {
        return {
            loading: false,
            uploadImg: '',
            resultImg: ''
        };
    },
    methods: {
        async handleChange(options) {
            let file = options.fileList[0].file;
            console.log(file);
            let reader = new FileReader();
            let page = this;
            this.loading = true;
            reader.onloadend = function () {
                // 当读取完成后，result 属性包含了一个 Base64 编码的数据 URL
                let base64 = reader.result;
                page.uploadImg = base64;
                // 然后你可以将这个 Base64 编码的数据 URL 发送给你的接口
                axios.post('/sd/sdapi/v1/img2img', {
                    "prompt": "(masterpiece),(best quality),(ultra-detailed), smile",
                    "negative_prompt": "(low quality:1.3), (worst quality:1.3)",
                    // "styles": [
                    //     "string"
                    // ],
                    "seed": -1,
                    "subseed": -1,
                    "subseed_strength": 0,
                    "seed_resize_from_h": -1,
                    "seed_resize_from_w": -1,
                    "sampler_name": "Euler a",
                    "batch_size": 1,
                    "n_iter": 1,
                    "steps": 25,
                    "cfg_scale": 7,
                    "width": 512,
                    "height": 712,
                    "restore_faces": true,
                    "tiling": true,
                    "do_not_save_samples": false,
                    "do_not_save_grid": false,
                    "eta": 0,
                    "denoising_strength": 0.3,
                    "s_min_uncond": 0,
                    "s_churn": 0,
                    "s_tmax": 0,
                    "s_tmin": 0,
                    "s_noise": 0,
                    "override_settings": {},
                    "override_settings_restore_afterwards": true,
                    "refiner_checkpoint": "openjourneyV4.ckpt",
                    "refiner_switch_at": 0,
                    "disable_extra_networks": false,
                    "comments": {},
                    "init_images": [
                        base64
                    ],
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
                    "latent_mask": "string",
                    "force_task_id": "string",
                    "sampler_index": "Euler",
                    "include_init_images": false,
                    // "script_name": "string",
                    // "script_args": [],
                    "send_images": true,
                    "save_images": false,
                    "alwayson_scripts": {}
                }, {
                    auth: {
                        username: 'admin',
                        password: 'U=x6Jx2(98+cJQPh'
                    }
                })
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));
                        page.resultImg = 'data:image/png;base64,' + response.data.images[0];
                        page.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            // 开始读取文件
            reader.readAsDataURL(file);

        }
    }
};
</script>