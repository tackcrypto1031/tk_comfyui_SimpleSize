# TK ComfyUI SimpleSize

A professional and smart aspect ratio and resolution selector for ComfyUI. This tool simplifies the process of choosing optimal resolutions for various AI models, ensuring your generations always hit the right pixel counts and aspect ratios.

## 🚀 Key Features

- **Multi-Model Support**: Tailored resolution presets for **SD1.5**, **SDXL**, **FLUX**, **QwenImage**, **Zimage**, and **WAN**.
- **Contextual Filtering**: The tool dynamically filters resolution options based on your selected model and target aspect ratio.
- **Smart Ratios**: Supports all common aspect ratios, including `1:1`, `2:3`, `3:2`, `3:4`, `16:9`, `9:16`, `9:21`, and `21:9`.
- **Clean UI**: Simple dropdown-based interface that prevents configuration errors by only showing valid combinations.
- **Dynamic Calculation**: For models like **WAN**, resolutions are automatically calculated and sorted for both vertical and horizontal orientations.

## 🛠️ Installation

1. Navigate to your ComfyUI `custom_nodes` directory:
   ```bash
   cd ComfyUI/custom_nodes/
   ```
2. Clone this repository:
   ```bash
   git clone https://github.com/USER_NAME/tk_comfyui_simplesize.git
   ```
3. Restart ComfyUI.

## 📖 How to Use

1. **Add Node**: Right-click in the ComfyUI workspace and search for `TK_SimpleSize` (found under the `TK/SimpleSize` category).
2. **Select Model**: Choose your base model (e.g., `FLUX` or `SDXL`).
3. **Select Ratio**: Pick your desired aspect ratio (e.g., `16:9`).
4. **Select Resolution**: The `resolution` dropdown will automatically populate with optimal dimensions for that model and ratio.
5. **Connect Outputs**: Connect the `width` and `height` outputs to your sampler or latent image node.

## 📂 Example Workflows

You can find example workflows in the project's repository to help you get started quickly. These demonstrate how to integrate `TK_SimpleSize` into standard generation pipelines.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new models or resolutions, feel free to open an issue or submit a pull request.

---
*Created by [USER_NAME]*
