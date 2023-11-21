import ControlNet from './ControlNet.js';

export default class Img2imgConfig {
    constructor(style, originalImage) {
        this.prompt = style.prompt;
        this.negative_prompt = style.negative_prompt;
        this.styles = [];
        this.init_images = [originalImage];
        this.steps = 30;
        this.cfg_scale = 10;
        this.seed = -1;
        this.refiner_checkpoint = style.refiner_checkpoint;
        this.refiner_switch_at = "0";
        this.width = 512;
        this.height = 704;
        this.denoising_strength = 0.3,
            this.clip_skip = 2,
            this.image_cfg_scale = 0,
            this.sampler_name = "DPM++ 2M SDE Heun Karras",
            this.include_init_images = true,
            this.send_images = true,
            this.save_images = false,
            this.do_not_save_samples = true,
            this.do_not_save_grid = true,
            this.disable_extra_networks = true,
            this.resize_mode = 1,
            this.alwayson_scripts = {
                controlnet: {
                    args: [
                        new ControlNet()
                    ]
                }
            };
    }
}
