import ControlNet from "./ControlNet.js";

const commonPrompt = "masterpiece, best quality,8k,cinematic light, ultra high res,solo,";
const commonNegativePrompt = "NSFW,(cross-eyed:1.5),EasyNegative, drawn by bad-artist, sketch by bad-artist-anime, (bad_prompt:0.8), (artist name, signature, watermark:1.4), (ugly:1.5), (worst quality, poor details:1.4), bad-hands-5, badhandv4, blurry, blush, red_face,(mole:1.2)";

const Style = Object.freeze({
    plusGirl: {
        prompt: commonPrompt + "1girl,White and tender skin",
        negative_prompt: commonNegativePrompt,
        override_settings: {
            sd_model_checkpoint: "botRealisicSoeasy_v10"
        },
        refiner_checkpoint: "",
        refiner_switch_at: "-1",
        mask_blur_x: 0,
        mask_blur_y: 0,
        mask_blur: 10,
        inpainting_fill: 0,
        inpaint_full_res: false,
        inpaint_full_res_padding: 32,
        inpainting_mask_invert: 0,
    },
    plusBoy: {
        prompt: commonPrompt + "1boy,White and tender skin",
        negative_prompt: commonNegativePrompt,
        override_settings: {
            sd_model_checkpoint: "botRealisicSoeasy_v10"
        },
        refiner_checkpoint: "",
        refiner_switch_at: "-1",
        mask_blur_x: 0,
        mask_blur_y: 0,
        mask_blur: 10,
        inpainting_fill: 0,
        inpaint_full_res: false,
        inpaint_full_res_padding: 32,
        inpainting_mask_invert: 0,
    },
    BeautyGirl: {
        prompt: commonPrompt + "1girl,White and tender skin",
        negative_prompt: commonNegativePrompt,
        override_settings: {
            sd_model_checkpoint: "botRealisicSoeasy_v10"
        },
        refiner_checkpoint: "",
        refiner_switch_at: "-1",
        alwayson_scripts: {
            controlnet: {
                args: [
                    new ControlNet()
                ]
            }
        }
    },
    BeautyBoy: {
        prompt: commonPrompt + "1boy,White and tender skin",
        negative_prompt: commonNegativePrompt,
        override_settings: {
            sd_model_checkpoint: "botRealisicSoeasy_v10"
        },
        alwayson_scripts: {
            controlnet: {
                args: [
                    new ControlNet()
                ]
            }
        }
    },
    QGirl: {
        prompt: commonPrompt + "1girl,chibi,child, Colorful personality,delicate like a porcelain doll",
        negative_prompt: commonNegativePrompt,
        override_settings: {
            sd_model_checkpoint: "realcartoon3d_v30"
        },
        refiner_checkpoint: "helloq3Q_helloq3V10c",
        refiner_switch_at: "0.01",
        alwayson_scripts: {
            controlnet: {
                args: [
                    new ControlNet()
                ]
            }
        }
    },
    QBoy: {
        prompt: commonPrompt + "1boy,chibi,child, ,younger,Colorful personality,delicate like a porcelain doll",
        negative_prompt: commonNegativePrompt,
        override_settings: {
            sd_model_checkpoint: "realcartoon3d_v30"
        },
        refiner_checkpoint: "helloq3Q_helloq3V10c",
        refiner_switch_at: "0.01",
        alwayson_scripts: {
            controlnet: {
                args: [
                    new ControlNet()
                ]
            }
        }
    },
    ComicGirl: {
        prompt: commonPrompt + "chibi, 1girl,White and tender skin, Anime style",
        negative_prompt: commonNegativePrompt,
        override_settings: {
            sd_model_checkpoint: "mixProV4_v4"
        },
        refiner_checkpoint: "",
        refiner_switch_at: "-1",
        alwayson_scripts: {
            controlnet: {
                args: [
                    new ControlNet()
                ]
            }
        }
    },
    ComicBoy: {
        prompt: commonPrompt + "chibi, 1boy,White and tender skin, Anime style",
        negative_prompt: commonNegativePrompt,
        override_settings: {
            sd_model_checkpoint: "mixProV4_v4"
        },
        refiner_checkpoint: "",
        refiner_switch_at: "-1",
        alwayson_scripts: {
            controlnet: {
                args: [
                    new ControlNet()
                ]
            }
        }
    }
});

export default Style;