import { Injectable } from '@angular/core';

let infiniteX = Infinity;
let infiniteY = Infinity;


@Injectable({ 'providedIn': 'root' })
export class PaintService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx!: CanvasRenderingContext2D;
  public lineWidth: number = 1;
  public color: string = '#000';


  public setLinewidth(value: number): void {
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

  paint({ clientX = 0, clientY = 0 }) {
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
}
