import { Color } from "../types/base/color";
import { DrawingToolOptions } from "../types/drawing-tools/drawing-tool-options";
import { DrawingToolType } from "../types/drawing-tools/drawing-tool-type";
import { FillType } from "../types/drawing-tools/fill-type";

export const COLOR_WHITE: Color = { r: 255, g: 255, b: 255 };

export const DEFAULT_AVAILABLE_COLORS: Color[] = [
  { r: 0, g: 0, b: 0 },
  COLOR_WHITE,
  { r: 128, g: 128, b: 128 },
  { r: 196, g: 196, b: 196 },
  { r: 128, g: 0, b: 0 },
  { r: 255, g: 0, b: 0 },
  { r: 128, g: 128, b: 0 },
  { r: 255, g: 255, b: 0 },
  { r: 0, g: 128, b: 0 },
  { r: 0, g: 255, b: 0 },
  { r: 0, g: 128, b: 128 },
  { r: 0, g: 255, b: 255 },
  { r: 0, g: 0, b: 128 },
  { r: 0, g: 0, b: 255 },
  { r: 128, g: 0, b: 128 },
  { r: 255, g: 0, b: 255 },
];

export const DEFAULT_DRAWING_TOOL_OPTIONS: DrawingToolOptions = {
  [DrawingToolType.rectangle]: { fillType: FillType.EMPTY },
};
