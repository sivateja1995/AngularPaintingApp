import { DrawingToolAction } from './drawing-tool-action';
import { drawRectangle, fillRectangle, getLinePoints, setPixelInOriginalImage } from '../../../helpers/drawing.helpers';
import { Point } from '../../../types/base/point';
import { Color } from '../../../types/base/color';
import { TsPaintStoreState } from 'src/app/paint/services/paint.store.state';
import { RectangleOptions } from '../../drawing-tools/drawing-tool-options';
import { DrawingToolType } from '../../drawing-tools/drawing-tool-type';
import { FillType } from '../../drawing-tools/fill-type';

export class RectangleAction extends DrawingToolAction {
  protected draw(
    points: Point[],
    color1: Color,
    color2: Color,
    image: ImageData,
    state: TsPaintStoreState
  ) {
    const options: RectangleOptions =
      state.drawingToolOptions[DrawingToolType.rectangle];

    if (options.fillType === FillType.EMPTY) {
      drawRectangle(
        { start: points[0], end: points[1] },
        color1,
        image,
        this.getborderLine(state)
      );
    } else if (options.fillType === FillType.FILL_SECONDARY) {
      fillRectangle({ start: points[0], end: points[1] }, color2, image);
      drawRectangle({ start: points[0], end: points[1] }, color1, image,this.getborderLine(state));
    } else {
      fillRectangle({ start: points[0], end: points[1] }, color1, image);
    }
  }

  private getborderLine(
    state: TsPaintStoreState
  ): (start: Point, end: Point, color: Color, image: ImageData) => void {
    return (start: Point, end: Point, color: Color, image: ImageData) => {
      const dashLength: number = Math.ceil(4 / state.zoom);
      const pointsToPaint: Point[] = getLinePoints(start, end);
      pointsToPaint.forEach((point, index) => {
        if (Math.floor(index / dashLength) % 1 === 0) {
          setPixelInOriginalImage(point, color, image);
        }
      });
    };
  }
}
