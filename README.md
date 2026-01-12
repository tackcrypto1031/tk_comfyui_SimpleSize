# TK ComfyUI SimpleSize

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ComfyUI](https://img.shields.io/badge/ComfyUI-Works-blue.svg)](https://github.com/comfyanonymous/ComfyUI)
[![Maintainer](https://img.shields.io/badge/Maintainer-Tack-orange.svg)](mailto:tack1031@gmail.com)

A professional and intelligent aspect ratio and resolution selector for **ComfyUI**. Simplify your workflow by choosing optimal resolutions tailored for specific AI models.

![SimpleSize Sample](https://github.com/tackcrypto1031/tk_comfyui_SimpleSize/raw/main/sample/sample.png)

---

## 🌟 Key Features

- **🎯 Multi-Model Optimization**: Native support for **FLUX**, **SDXL**, **SD1.5**, **QwenImage**, **Zimage**, and **WAN**.
- **🧠 Intelligent Filtering**: Dynamically filters resolution presets based on the selected model and aspect ratio (e.g., 1:1, 16:9, 9:21).
- **⚡ Integrated Latent Output**: Automatically generates a standard empty latent (1/8 scale) matching the selected resolution—no extra nodes required.
- **📱 Responsive Ratios**: Comprehensive support for modern aspect ratios including standard, cinematic, and mobile-friendly formats.
- **🎨 Visual Clarity**: A clean, dropdown-based UI that prevents selection errors and ensures pixel-perfect generations.

## 🛠️ Installation

### Method 1: ComfyUI Manager (Recommended)
Search for `TK_SimpleSize` in the [ComfyUI Manager](https://github.com/ltdrdata/ComfyUI-Manager) and click **Install**.

### Method 2: Manual Installation
1. Open terminal and navigate to your ComfyUI `custom_nodes` folder:
   ```bash
   cd ComfyUI/custom_nodes/
   ```
2. Clone the repository:
   ```bash
   git clone https://github.com/tackcrypto1031/tk_comfyui_simplesize.git
   ```
3. Restart ComfyUI.

## 📖 How to Use

1. **Add Node**: Search for `TK_SimpleSize` under the `TK/SimpleSize` category.
2. **Configure**: 
   - Select **Model Name** (e.g., `FLUX`).
   - Choose **Target Ratio** (e.g., `16:9`).
   - Pick the **Resolution** from the auto-populated list.
3. **Connect**:
   - `width`/`height`: Connect to resolution inputs.
   - `latent`: Connect directly to a `KSampler` or `SamplerCustom` node.

---

## 🇹🇼 繁體中文說明

**TK ComfyUI SimpleSize** 是一款為 ComfyUI 設計的專業解析度與長寬比選擇器。它能自動根據您選擇的模型（如 FLUX, SDXL）提供最佳的解析度預設，避免解析度設定錯誤導致的圖像崩壞。

### 核心優勢
- **自動過濾**：根據模型特性與比例，自動顯示最合適的像素組合。
- **內建 Latent**：節省節點空間，直接輸出對應尺寸的 Empty Latent。
- **支援廣泛**：全面支援從 SD1.5 到最新的 FLUX 與 WAN 模型。

---

## 📂 Example Workflows

Example workflows are located in the `workflow` directory of this repository. These show how to integrate the node into standard generation pipelines for different models.

## 🤝 Contributing & Feedback

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

* **Author**: Tack
* **Email**: [tack1031@gmail.com](mailto:tack1031@gmail.com)
* **GitHub**: [tackcrypto1031](https://github.com/tackcrypto1031)

---
*Developed with ❤️ by Tack*

