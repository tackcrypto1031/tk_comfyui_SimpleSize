from .nodes import TK_SimpleSize

NODE_CLASS_MAPPINGS = {
    "TK_SimpleSize": TK_SimpleSize,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "TK_SimpleSize": "TK SimpleSize",
}

WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
