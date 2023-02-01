import { DrawingToolAction } from './drawing-tool-action';
import { getLinePoints, setPixelInOriginalImage, drawRectangle } from '../../../helpers/drawing.helpers';
import { Point } from '../../../types/base/point';
import { Color } from '../../../types/base/color';
import { TsPaintStoreState } from 'src/app/paint/services/paint.store.state';
import { RectangleArea } from '../../base/rectangle-area';
import { getImagePart, fillAreaInOriginalImage } from '../../../helpers/image.helpers';

export class RectangleSelectAction extends DrawingToolAction {
  constructor(public override points: Point[], public override swapColors: boolean, public override renderIn: 'image' | 'preview' | 'nowhere') {
    super(points, swapColors, renderIn);
  }

  protected draw(points: Point[], color1: Color, color2: Color, image: ImageData, state: TsPaintStoreState) {
    if (this.renderIn === 'preview') {
      drawRectangle({ start: points[0], end: points[1] }, state.primaryColor, image, this.getDashedLineStyle(state));
    } else if (this.renderIn === 'image') {
      const area: RectangleArea = { start: points[0], end: points[1] };
      fillAreaInOriginalImage(image, state.primaryColor, area);
    }
  }

  protected override addPatches(state: TsPaintStoreState): Partial<TsPaintStoreState> {
    const patches: Partial<TsPaintStoreState> = {};

    if (this.renderIn === 'image') {
      const area: RectangleArea = { start: this.points[0], end: this.points[1] };
      patches.selectionImage = getImagePart(area, state.image);
      patches.selectionOffset = { w: Math.min(area.start.w, area.end.w), h: Math.min(area.start.h, area.end.h) };
    }

    return patches;
  }

  private getDashedLineStyle(
    state: TsPaintStoreState
  ): (start: Point, end: Point, color: Color, image: ImageData) => void {
    return (start: Point, end: Point, color: Color, image: ImageData) => {
      const dashLength: number = Math.ceil(4 / state.zoom);
      const pointsToPaint: Point[] = getLinePoints(start, end);
      pointsToPaint.forEach((point, index) => {
        if (Math.floor(index / dashLength) % 2 === 0) {
          setPixelInOriginalImage(point, color, image);
        }
      });
    };
  }
}
