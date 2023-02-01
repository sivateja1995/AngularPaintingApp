import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Point } from '../../types/base/point';

@Component({
  selector: 'app-zoomable-canvas',
  templateUrl: './zoomable-canvas.component.html',
  styleUrls: ['./zoomable-canvas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomableCanvasComponent implements OnChanges {
  @Input()
  zoom: number = 1;
  @Input()
  image!: ImageData;
  @Input()
  parentImage!: ImageData;
  @Input()
  offset: Point = { w: 0, h: 0 };
  @Input()
  invertBackground: boolean = false;
  @ViewChild('imageCanvas', { static: true })
  imageCanvas!: ElementRef;

  zoomedWidth: number = 0;
  zoomedHeight: number = 0;
  zoomedOffsetW: number = 0;
  zoomedOffsetH: number = 0;

  constructor() {}

  ngOnChanges(): void {
    if (this.imageCanvas) {
      const canvas = this.imageCanvas.nativeElement;
      const context: CanvasRenderingContext2D = canvas.getContext('2d');

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

        this.zoomedWidth = canvasWidth * this.zoom;
        this.zoomedHeight = canvasHeight * this.zoom;
        this.zoomedOffsetW = Math.max(this.offset?.w ?? 0, 0) * this.zoom;
        this.zoomedOffsetH = Math.max(this.offset?.h ?? 0, 0) * this.zoom;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context.putImageData(
          this.image,
          Math.min(this.offset.w, 0),
          Math.min(this.offset.h, 0)
        );
      } else {
        canvas.width = 0;
        canvas.height = 0;
      }
    }

    if (this.invertBackground) {
    }
  }
}
