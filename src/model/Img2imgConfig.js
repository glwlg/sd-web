import ControlNet from './ControlNet.js';
import Style from "./StyleMap.js";

export default class Img2imgConfig {
    constructor(style, originalImage, maskImage) {
        this.prompt = style.prompt;
        this.negative_prompt = style.negative_prompt;
        this.styles = [];
        this.init_images = [originalImage];
        this.steps = 30;
        this.cfg_scale = 10;
        this.seed = -1;
        this.override_settings = style.override_settings;
        this.refiner_checkpoint = style.refiner_checkpoint;
        this.refiner_switch_at = style.refiner_switch_at;
        this.width = 512;
        this.height = 704;
        this.denoising_strength = 0.3;
        this.clip_skip = 2;
        this.image_cfg_scale = 0;
        this.sampler_name = "DPM++ 2M SDE Heun Karras";
        this.include_init_images = true;
        this.send_images = true;
        this.save_images = false;
        this.do_not_save_samples = true;
        this.do_not_save_grid = true;
        this.disable_extra_networks = true;
        this.alwayson_scripts = style.alwayson_scripts;
        this.mask = maskImage;
        this.mask_blur_x = style.mask_blur_x;
        this.mask_blur_y = style.mask_blur_y;
        this.mask_blur = style.mask_blur;
        this.inpainting_fill = style.inpainting_fill;
        this.inpaint_full_res = style.inpaint_full_res;
        this.inpaint_full_res_padding = style.inpaint_full_res_padding;
        this.inpainting_mask_invert = style.inpainting_mask_invert;
    }

    plusGirl(maskImage){
        this.mask = maskImage;
        this.mask_blur_x = 0;
        this.mask_blur_y = 0;
        this.mask_blur = 10;
        this.inpainting_fill = 0;
        this.inpaint_full_res = style.inpaint_full_res;
        this.inpaint_full_res_padding = style.inpaint_full_res_padding;
        this.inpainting_mask_invert = style.inpainting_mask_invert;
        return this;
    }

}
