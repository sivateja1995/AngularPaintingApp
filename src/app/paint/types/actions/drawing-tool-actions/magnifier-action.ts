import { DrawingToolAction } from './drawing-tool-action';
import { Point } from '../../base/point';
import { Color } from '../../base/color';
import { TsPaintStoreState } from '../../../services/paint.store.state'
import { TsPaintAction } from '../ts-paint-action';
import { drawRectangle } from 'src/app/paint/helpers/drawing.helpers';
import { RectangleArea } from '../../base/rectangle-area';
import { COLOR_WHITE } from 'src/app/paint/services/paint.config';
import { constrainPointToImage } from 'src/app/paint/helpers/image.helpers';

export class MagnifierAction extends DrawingToolAction {
  protected override getAffectedArea(state: TsPaintStoreState): RectangleArea {
    return this.getZoomedViewport(state, this.points[0]);
  }

  protected draw(points: Point[], color1: Color, color2: Color, image: ImageData, state: TsPaintStoreState) {
    if (this.renderIn === 'preview') {
      drawRectangle(
        { start: { w: 0, h: 0 }, end: { w: image.width - 1, h: image.height - 1 } }, // image is the zoomed viewport, we draw a rectangle to mark where it will be
        COLOR_WHITE, // Because this tool uses the invertedPreview option, COLOR_WHITE is used to invert the background
        image
      );
    }
  }

  protected override addPatches(state: TsPaintStoreState): Partial<TsPaintStoreState> {
    if (this.renderIn === 'preview') {
      return {};
    }

    const zoomMultiplier: number = this.swapColors ? 0.5 : 2; // swapColors = right/left mouse button
    const newZoom: number = state.zoom * zoomMultiplier;

    return { zoom: newZoom, scrollPosition: this.getScrollPosition(state.viewportSize, newZoom, this.points[0]) };
  }

  protected override getUndoActions(state: TsPaintStoreState): TsPaintAction[] {
    return [new MagnifierAction(this.points, !this.swapColors, this.renderIn)];
  }

  private getZoomedViewportSize(state: TsPaintStoreState): Point {
    const newZoom: number = state.zoom * 2;
    return { w: state.viewportSize.w / newZoom, h: state.viewportSize.h / newZoom };
  }

  private getZoomedViewport(state: TsPaintStoreState, centre: Point): RectangleArea {
    const zoomedViewportSize: Point = this.getZoomedViewportSize(state);
    const halfWidth: number = Math.ceil(zoomedViewportSize.w / 2);
    const halfHeight: number = Math.ceil(zoomedViewportSize.h / 2);

    let start: Point = { w: centre.w - halfWidth, h: centre.h - halfHeight };
    let end: Point = { w: centre.w + halfWidth, h: centre.h + halfHeight };
    start = constrainPointToImage(state.image, start);
    end = constrainPointToImage(state.image, end);

    return { start, end };
  }

  private getScrollPosition(viewportSize: Point, zoom: number, centre: Point): Point {
    const zoomedCentre: Point = { w: centre.w * zoom, h: centre.h * zoom };
    const w: number = Math.max(0, Math.floor(zoomedCentre.w - viewportSize.w / 2));
    const h: number = Math.max(0, Math.floor(zoomedCentre.h - viewportSize.h / 2));

    return { w, h };
  }
}
