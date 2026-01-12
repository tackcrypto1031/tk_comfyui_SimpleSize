
class TK_SimpleSize:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        # We define a generic list here. The frontend completely overrides these options.
        # Ratios
        ratios = ["1:1", "2:3", "3:2", "3:4", "16:9", "9:16", "9:21", "21:9"]
        
        # Resolutions (placeholder, frontend populates)
        # We provide a default safe list to pass validation if JS fails to load
        resolutions = ["512x512", "1024x1024"]

        return {
            "required": {
                "model_name": (["SD1.5", "SDXL", "FLUX", "QwenImage", "Zimage", "WAN"],),
                "target_ratio": (ratios,),
                "resolution": (resolutions,),
            },
        }

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("width", "height")
    FUNCTION = "get_size"
    CATEGORY = "TK/SimpleSize"

    def get_size(self, model_name, target_ratio, resolution):
        # The primary source of truth is now 'resolution' which should be "WxH"
        # We can mostly ignore 'target_ratio' in the backend, as 'resolution' contains the exact numbers.
        
        try:
            # Expected format "WxH" e.g. "1280x720"
            if "x" in resolution:
                w, h = resolution.split("x")
                return (int(w.strip()), int(h.strip()))
            
            # Formatting fallback if someone connects a string manually
            # or if the frontend sends the old format "Ratio (WxH)"
            if "(" in resolution and ")" in resolution:
                 dims = resolution.split("(")[1].split(")")[0]
                 if "x" in dims:
                    w, h = dims.split("x")
                    return (int(w.strip()), int(h.strip()))

        except Exception as e:
            print(f"Error parsing resolution: {e}")

        # Fallback default
        return (512, 512)
