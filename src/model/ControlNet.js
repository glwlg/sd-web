export default class ControlNet {
    constructor() {
        this.enabled = true,
            this.module = "softedge_pidinet",
            this.model = "control_v11p_sd15_softedge",
            this.weight = 0.8,
            this.resize_mode = "Crop and Resize",
            this.lowvram = false,
            this.processor_res = 512,
            this.guidance = 1,
            this.guidance_start = 0,
            this.guidance_end = 1,
            this.pixel_perfect = true,
            this.control_mode = "Balanced"
    }
}