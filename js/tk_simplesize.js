import { app } from "../../scripts/app.js";

const RESOLUTIONS = {
    "SD1.5": {
        "1:1": "1:1 (512x512)",
        "2:3": "2:3 (512x768)",
        "3:2": "3:2 (768x512)",
        "16:9": "16:9 (768x432)",
        "9:16": "9:16 (432x768)",
        "9:21": "9:21 (384x896)",
        "21:9": "21:9 (896x384)"
    },
    "SDXL": {
        "1:1": "1:1 (1024x1024)",
        "2:3": "2:3 (832x1216)",
        "3:2": "3:2 (1216x832)",
        "16:9": "16:9 (1344x768)",
        "9:16": "9:16 (768x1344)",
        "9:21": "9:21 (640x1536)",
        "21:9": "21:9 (1536x640)"
    },
    "QwenImage": {
        "1:1": "1:1 (1328x1328)",
        "2:3": "2:3 (1056x1584)",
        "3:2": "3:2 (1584x1056)",
        "16:9": "16:9 (1664x928)",
        "9:16": "9:16 (928x1664)"
    },
    "Zimage": {
        "1:1": [
            "1:1 (1440x1440)",
            "1:1 (1024x1024)"
        ],
        "2:3": "2:3 (1088x1600)",
        "3:2": "3:2 (1600x1088)",
        "16:9": "16:9 (1920x1088)",
        "9:16": "9:16 (1088x1920)"
    },
    "FLUX": {
        "1:1": "1:1 (1448x1448)",
        "2:3": "2:3 (1152x1728)",
        "3:2": "3:2 (1728x1152)",
        "16:9": "16:9 (1920x1088)",
        "9:16": "9:16 (1088x1920)",
        "9:21": "9:21 (960x2176)",
        "21:9": "21:9 (2176x960)"
    },
    "WAN": {
        "1:1": "1:1 (624x624)",
        "2:3": [
            "2:3 (384x576)",
            "2:3 (528x768)",
            "2:3 (624x912)",
            "2:3 (656x960)",
            "2:3 (736x1072)",
            "2:3 (784x1136)"
        ],
        "3:2": "3:2 (752x512)",
        "3:4": [
            "3:4 (416x544)",
            "3:4 (560x720)",
            "3:4 (672x864)",
            "3:4 (720x912)",
            "3:4 (784x1008)",
            "3:4 (848x1088)"
        ],
        "16:9": "16:9 (1280x720)", // Will be overwritten/appended dynamically logic below
        "9:16": [
            "9:16 (368x624)",
            "9:16 (480x848)",
            "9:16 (576x1008)",
            "9:16 (608x1072)",
            "9:16 (672x1184)",
            "9:16 (720x1264)"
        ]
    }
};

// Helper: Extract WxH from "Ratio (WxH)" string
function getDims(str) {
    if (!str.includes("(") || !str.includes(")")) return null;
    return str.split("(")[1].split(")")[0];
}

// Logic to invert dims for WAN 16:9 from 9:16
function generateWan169() {
    const wan916 = RESOLUTIONS["WAN"]["9:16"];
    const wan169 = [];

    // Add default single 16:9 if exists
    if (RESOLUTIONS["WAN"]["16:9"]) {
        if (Array.isArray(RESOLUTIONS["WAN"]["16:9"])) {
            wan169.push(...RESOLUTIONS["WAN"]["16:9"]);
        } else {
            wan169.push(RESOLUTIONS["WAN"]["16:9"]);
        }
    }

    if (Array.isArray(wan916)) {
        wan916.forEach(item => {
            const dims = getDims(item);
            if (dims) {
                const [w, h] = dims.split("x").map(Number);
                const inverted = `16:9 (${h}x${w})`;
                // Avoid dupes
                if (!wan169.includes(inverted)) {
                    wan169.push(inverted);
                }
            }
        });
    }

    // Sort logic could go here, but simple append is fine
    RESOLUTIONS["WAN"]["16:9"] = wan169;
}

// Run generation once
generateWan169();


app.registerExtension({
    name: "TK.SimpleSize",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "TK_SimpleSize") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) {
                    onNodeCreated.apply(this, arguments);
                }

                const modelWidget = this.widgets.find((w) => w.name === "model_name");
                const ratioWidget = this.widgets.find((w) => w.name === "target_ratio");
                const resWidget = this.widgets.find((w) => w.name === "resolution"); // This needs to exist in backend INPUT_TYPES

                if (!modelWidget || !ratioWidget || !resWidget) {
                    return;
                }

                const updateResolutions = () => {
                    const model = modelWidget.value;
                    const ratio = ratioWidget.value;
                    let options = [];

                    if (RESOLUTIONS[model] && RESOLUTIONS[model][ratio]) {
                        const val = RESOLUTIONS[model][ratio];
                        if (Array.isArray(val)) {
                            // Just extract the dim part for the second dropdown? Or keep full string?
                            // User wants to see just resolutions probably? Or keep format for consistency?
                            // Request says "quick distinguish ratio and options".
                            // Let's keep the full string "1:1 (WxH)" in the resolution dropdown too, or simplifiy to "WxH"?
                            // Simplification "WxH" is cleaner if the first box already says "1:1".

                            // Let's try to extract just "WxH" for the second box
                            options = val.map(v => getDims(v));
                        } else {
                            options = [getDims(val)];
                        }
                    } else {
                        options = ["Select Ratio"];
                    }

                    resWidget.options.values = options;
                    if (!options.includes(resWidget.value)) {
                        resWidget.value = options[0] || "";
                    }
                };

                const updateRatios = () => {
                    const model = modelWidget.value;
                    let ratios = [];

                    if (RESOLUTIONS[model]) {
                        ratios = Object.keys(RESOLUTIONS[model]);
                    } else {
                        ratios = ["Select Model First"];
                    }

                    ratioWidget.options.values = ratios;

                    if (!ratios.includes(ratioWidget.value)) {
                        ratioWidget.value = ratios[0] || "";
                    }

                    // Cascade update
                    updateResolutions();
                };

                modelWidget.callback = updateRatios;
                ratioWidget.callback = updateResolutions;

                // Initial update
                updateRatios();
            };
        }
    },
});
