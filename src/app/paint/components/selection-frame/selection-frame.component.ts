import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { loadImageToCanvas } from '../../helpers/canvas.helpers';
import { drawDashedFrame } from '../../helpers/drawing.helpers';
import { Point } from '../../types/base/point';

@Component({
  selector: 'app-selection-frame',
  templateUrl: './selection-frame.component.html',
  styleUrls: ['./selection-frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionFrameComponent implements OnChanges {
  @Input()
  zoom: number = 1;
  @Input()
  image!: ImageData;
  @Input()
  parentImage!: ImageData;
  @Input()
  offset: Point = { w: 0, h: 0 };

  @ViewChild('imageCanvas')
  public imageCanvas!: ElementRef;

  SELECTION_PADDING: 2 = 2;

  zoomedWidth: number = 0;
  zoomedHeight: number = 0;
  zoomedOffsetW: number = 0;
  zoomedOffsetH: number = 0;

  ngOnChanges(): void {
    if (this.image) {
      const parentWidth: number = (this.parentImage || this.image).width;
      const parentHeight: number = (this.parentImage || this.image).height;

      const canvasWidth: number =
        this.offset.w < 0
          ? this.image.width + this.offset.w
          : Math.min(this.image.width, parentWidth - this.offset.w);
      const canvasHeight: number =
        this.offset.h < 0
          ? this.image.height + this.offset.h
          : Math.min(this.image.height, parentHeight - this.offset.h);

      this.zoomedWidth = canvasWidth * this.zoom + 2 * this.SELECTION_PADDING;
      this.zoomedHeight = canvasHeight * this.zoom + 2 * this.SELECTION_PADDING;
      this.zoomedOffsetW =
        Math.max(this.offset?.w ?? 0, 0) * this.zoom - this.SELECTION_PADDING;
      this.zoomedOffsetH =
        Math.max(this.offset?.h ?? 0, 0) * this.zoom - this.SELECTION_PADDING;

      const dashedFrame: ImageData = new ImageData(
        this.zoomedWidth,
        this.zoomedHeight
      );
      drawDashedFrame(dashedFrame);
      loadImageToCanvas(dashedFrame, this.imageCanvas.nativeElement);
    }
  }
}
