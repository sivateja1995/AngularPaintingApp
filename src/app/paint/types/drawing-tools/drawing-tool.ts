import { DrawingToolBehaviour } from './drawing-tool-behaviour';
import { Point } from '../base/point';
import { DrawingToolType } from './drawing-tool-type';
import { MouseButton } from '../mouse-tracker/mouse-button';
import { TsPaintAction } from '../actions/ts-paint-action';
import { TspMouseEvent } from '../mouse-tracker/tsp-mouse-event';
import { DrawingToolConfig, DRAWING_TOOL_CONFIG } from './drawing-tool-config';
import { calculateShapeDimensions } from '../../helpers/drawing.helpers';
import { DrawingToolAngleSnap } from './drawing-tool-angle-snap';
import { isDefined } from '../../helpers/typescript.helpers';

export class DrawingTool {
  private readonly _config: DrawingToolConfig;

  get helpText(): string {
    return this._config.helpText ?? '';
  }

  get invertedPreview(): boolean {
    return this._config.invertedPreview ?? false;
  }

  constructor(
    public type: DrawingToolType,
    private _addAction: (action: TsPaintAction) => void,
    private _clearPreview: () => void
  ) {
    this._config = { ...DRAWING_TOOL_CONFIG[type] };
  }

  public previewShapeStart: Point | undefined;
  public previewShapeDimensions: Point | undefined;

  private _mouseIsDown: boolean | undefined;
  private _mouseDownPoint: Point | undefined;
  private _mousePoints: Point[] = [];
  private _swapColors: boolean | undefined;

  mouseDown(event: TspMouseEvent) {
    this._mouseIsDown = true;
    this._swapColors = event.button !== MouseButton.LEFT;

    if (this._config.behaviour === DrawingToolBehaviour.CLICK_AND_DRAG) {
      this._mouseDownPoint = event.point;
    } else if (this._config.behaviour === DrawingToolBehaviour.FREE_DRAW) {
      this._mousePoints.push(event.point);
    }
  }

  mouseUp(event: TspMouseEvent) {
    const point: Point = event.shiftKey
      ? this.snapToAngle(event.point)
      : event.point;

    this._mouseIsDown = false;

    if (this._config.behaviour === DrawingToolBehaviour.CLICK_AND_DRAG) {
      if (this._config.maxPoints === 2) {
        this.addFinalAction([this._mouseDownPoint as Point, point]);
      } else {
        // TODO: Handle click & drag with multiple points
      }
    } else if (this._config.behaviour === DrawingToolBehaviour.FREE_DRAW) {
      this._mousePoints.push(point);
      this.addFinalAction(this._mousePoints);
    } else if (
      [
        DrawingToolBehaviour.SINGLE_POINT,
        DrawingToolBehaviour.SINGLE_POINT_WITH_PREVIEW,
      ].includes(this._config.behaviour)
    ) {
      this._mousePoints = [point];
      this.addFinalAction(this._mousePoints);
    }
  }

  mouseMove(event: TspMouseEvent) {
    const point: Point = event.shiftKey
      ? this.snapToAngle(event.point)
      : event.point;

    if (this._config.behaviour === DrawingToolBehaviour.CLICK_AND_DRAG) {
      if (this._mouseIsDown) {
        this.addPreviewAction([this._mouseDownPoint as Point, point]);
      }
    } else if (this._config.behaviour === DrawingToolBehaviour.FREE_DRAW) {
      if (this._mouseIsDown) {
        this._mousePoints.push(point);
        this.addPreviewAction(this._mousePoints);
      }
    } else if (
      this._config.behaviour === DrawingToolBehaviour.SINGLE_POINT_WITH_PREVIEW
    ) {
      if (event.outsideCanvas) {
        this._clearPreview();
      } else {
        this.addPreviewAction([point]);
      }
    }
  }

  private addPreviewAction(points: Point[]) {
    this.previewShapeStart = points[0];
    this.previewShapeDimensions = calculateShapeDimensions(
      points[0],
      points[points.length - 1]
    );
    const action: TsPaintAction = new this._config.actionClass(
      points,
      this._swapColors as boolean,
      'preview'
    );
    this._addAction(action);
  }

  private addFinalAction(points: Point[]) {
    const action: TsPaintAction = new this._config.actionClass(
      points,
      this._swapColors as boolean,
      'image'
    );
    this._addAction(action);
    this.clearData();
  }

  private clearData() {
    this.previewShapeStart = undefined;
    this.previewShapeDimensions = undefined;
    this._mouseIsDown = undefined;
    this._mouseDownPoint = undefined;
    this._mousePoints = [];
    this._swapColors = undefined;
  }

  private snapToAngle(point: Point): Point {
    if (
      this._config.angleSnap === DrawingToolAngleSnap.NONE ||
      [
        DrawingToolBehaviour.SINGLE_POINT,
        DrawingToolBehaviour.SINGLE_POINT_WITH_PREVIEW,
        DrawingToolBehaviour.TEXT,
        DrawingToolBehaviour.FREE_DRAW,
      ].includes(this._config.behaviour)
    ) {
      return point;
    } else {
      let previousPoint: Point = { w: 0, h: 0 };

      if (
        this._config.behaviour === DrawingToolBehaviour.CLICK_AND_DRAG &&
        this._mouseIsDown
      ) {
        previousPoint = this._mouseDownPoint as Point;
      } else if (!isDefined(previousPoint)) {
        return point;
      }

      const deltaW: number = point.w - previousPoint.w;
      const deltaH: number = point.h - previousPoint.h;
      const absDeltaW: number = Math.abs(deltaW);
      const absDeltaH: number = Math.abs(deltaH);
      let snappedDeltaW: number;
      let snappedDeltaH: number;

      const angleIsAround45Degrees: boolean =
        absDeltaW > absDeltaH / 2 && absDeltaH > absDeltaW / 2;

      if (
        this._config.angleSnap === DrawingToolAngleSnap.EVERY_45_DEGREES &&
        !angleIsAround45Degrees
      ) {
        const absDelta: number = Math.max(absDeltaH, absDeltaW);

        if (absDeltaW > absDeltaH) {
          snappedDeltaW = absDelta * Math.sign(deltaW);
          snappedDeltaH = 0;
        } else {
          snappedDeltaW = 0;
          snappedDeltaH = absDelta * Math.sign(deltaH);
        }
      } else {
        //DIAGONAL
        const absDelta: number = Math.min(absDeltaH, absDeltaW);
        snappedDeltaW = absDelta * Math.sign(deltaW);
        snappedDeltaH = absDelta * Math.sign(deltaH);
      }

      return {
        w: previousPoint.w + snappedDeltaW,
        h: previousPoint.h + snappedDeltaH,
      };
    }
  }
}
