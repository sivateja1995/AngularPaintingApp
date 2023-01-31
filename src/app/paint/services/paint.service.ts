import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

let infiniteX = Infinity;
let infiniteY = Infinity;


@Injectable({ 'providedIn': 'root' })
export class PaintService {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  public lineWidth: number = 1;
  public color: string = '#000';


  public setLineWidth(value: number): void {
    this.lineWidth = value;
  }

  initialize(mountPoint: HTMLElement) {
    this.canvas = mountPoint.querySelector('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = mountPoint.offsetWidth;
    this.canvas.height = mountPoint.offsetHeight;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.lineWidth;
  }

  line({ clientX = 0, clientY = 0 }) {
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    if (
      Math.abs(infiniteX - clientX) < 100 &&
      Math.abs(infiniteY - clientY) < 100
    ) {
      this.ctx.moveTo(infiniteX, infiniteY);
    }
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
    infiniteX = clientX;
    infiniteY = clientY;
    this.color;
  }

  // function for the drawing the rectangle
  rectangle() {

    let canvasOffSet = this.getOffset(this.canvas);
    let offSetX = canvasOffSet.left;
    let offSetY = canvasOffSet.top;
    var isDown = false;
    let startX: number;
    let startY: number;


    // event functions
    const move$ = fromEvent<MouseEvent>(this.canvas, 'mousemove');
    const down$ = fromEvent<MouseEvent>(this.canvas, 'mousedown');
    const up$ = fromEvent<MouseEvent>(this.canvas, 'mouseup');
    const out$ = fromEvent<MouseEvent>(this.canvas, 'mouseout');

    down$.subscribe((mouseDown) => {
      mouseDown.preventDefault()
      mouseDown.stopPropagation()
      startX = mouseDown.clientX - offSetX;
      startY = mouseDown.clientY - offSetY;
      isDown = true;

    })


    up$.subscribe((mouseUp) => {
      console.log(mouseUp)
      mouseUp.preventDefault();
      mouseUp.stopPropagation();
      isDown = false;
    })

    out$.subscribe((mouseOut) => {
      mouseOut.preventDefault();
      mouseOut.stopPropagation();
      isDown = false;
    })


    move$.subscribe((mouseMove) => {
      mouseMove.preventDefault()
      mouseMove.stopPropagation()
      if (isDown) {
        return;
      }
      let mouseX = mouseMove.clientX - offSetX;
      let mouseY = mouseMove.clientY - offSetY;


      let width = mouseX - startX;
      let height = mouseY - startY;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.beginPath()
      this.ctx.rect(startX, startY, width, height);
      this.ctx.stroke()


    })


  }


  private getOffset(el: HTMLElement) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  }
}
