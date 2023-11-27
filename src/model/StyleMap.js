const commonPrompt = "masterpiece, best quality,8k,cinematic light, ultra high res,solo,";
const commonNegativePrompt = "NSFW,(cross-eyed:1.5),EasyNegative, drawn by bad-artist, sketch by bad-artist-anime, (bad_prompt:0.8), (artist name, signature, watermark:1.4), (ugly:1.5), (worst quality, poor details:1.4), bad-hands-5, badhandv4, blurry, blush, red_face,(mole:1.2)";

const Style = Object.freeze({
    BeautyGirl: {
        prompt: commonPrompt + "1girl,White and tender skin",
        negative_prompt: commonNegativePrompt,
        sd_model_checkpoint: "botRealisicSoeasy_v10"
    },
    BeautyBoy: {
        prompt: commonPrompt + "1boy,White and tender skin",
        negative_prompt: commonNegativePrompt,
        sd_model_checkpoint: "botRealisicSoeasy_v10"
    },
    QGirl: {
        prompt: commonPrompt + "1girl,chibi,child, Colorful personality,delicate like a porcelain doll",
        negative_prompt: commonNegativePrompt,
        sd_model_checkpoint: "helloq3Q_helloq3V10c"
    },
    QBoy: {
        prompt: commonPrompt + "1boy,chibi,child, Colorful personality,delicate like a porcelain doll",
        negative_prompt: commonNegativePrompt,
        sd_model_checkpoint: "helloq3Q_helloq3V10c"
    },
    ComicGirl: {
        prompt: commonPrompt + "chibi, 1girl,White and tender skin, Anime style",
        negative_prompt: commonNegativePrompt,
        sd_model_checkpoint: "mixProV4_v4"
    },
    ComicBoy: {
        prompt: commonPrompt + "chibi, 1boy,White and tender skin, Anime style",
        negative_prompt: commonNegativePrompt,
        sd_model_checkpoint: "mixProV4_v4"
    }
});

export default Style;