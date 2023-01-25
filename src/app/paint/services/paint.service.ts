import { Injectable } from '@angular/core';

let infiniteX = Infinity;
let infiniteY = Infinity;
let colorHue = 1;

@Injectable({ 'providedIn': 'root' })
export class PaintService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx!: CanvasRenderingContext2D ;

  initialize(mountPoint: HTMLElement) {
    this.canvas = mountPoint.querySelector('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = mountPoint.offsetWidth;
    this.canvas.height = mountPoint.offsetHeight;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 30;
  }

  paint({ clientX = 0, clientY = 0 }) {
    console.log("clientx, clienty: ", clientX, clientY);
    this.ctx.strokeStyle = `hsl(${colorHue}, 100%, 60%)`;
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
    colorHue++;
  }
}
