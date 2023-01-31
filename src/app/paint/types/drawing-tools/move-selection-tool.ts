import { Point } from './../base/point';
import { TspMouseEvent } from '../mouse-tracker/tsp-mouse-event';
import { MoveSelectionAction } from '../actions/move-selection-action';

export class MoveSelectionTool {
  constructor(private _addAction: (action: MoveSelectionAction) => void) {}

  private _mouseIsDown: boolean = false;
  private _mouseDownPoint: Point | undefined;
  private _currentPosition!: Point | undefined;

  mouseDown(startingPosition: Point, event: TspMouseEvent) {
    this._currentPosition = startingPosition;
    this._mouseIsDown = true;
    this._mouseDownPoint = event.point;
  }

  mouseUp(event: TspMouseEvent) {
    const position: Point = this.calculateNewSelectionPosition(event.point);
    this._addAction(new MoveSelectionAction(position));

    this._mouseIsDown = false;
    this._mouseDownPoint = undefined;
    this._currentPosition = position;
  }

  mouseMove(event: TspMouseEvent) {
    if (this._mouseIsDown) {
      const position: Point = this.calculateNewSelectionPosition(event.point);
      this._addAction(new MoveSelectionAction(position));
    }
  }

  private calculateNewSelectionPosition(mousePosition: Point): Point {
    const w: number =
      mousePosition.w -
      (this._mouseDownPoint as Point).w +
      (this._currentPosition as Point).w;
    const h: number =
      mousePosition.h -
      (this._mouseDownPoint as Point).h +
      (this._currentPosition as Point).h;
    return { w, h };
  }
}
