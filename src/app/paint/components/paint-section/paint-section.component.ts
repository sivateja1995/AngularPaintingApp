import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { PaintService } from '../../services/paint.service';

@Component({
  selector: 'app-paint-section',
  template: `
    <canvas #mount id="canvas"></canvas>
  `,
  styleUrls: ['./paint-section.component.css']
})
export class PaintSectionComponent implements OnInit, AfterViewInit {

  constructor(private paintSvc: PaintService, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.paintSvc.initialize(this.elRef.nativeElement)

  }


  ngAfterViewInit(): void {
    this.drawRectangle()
  }

  // function for the line
  private startLine() {
    const { nativeElement } = this.elRef;
    const canvas = nativeElement.querySelector('canvas') as HTMLCanvasElement
    const move$ = fromEvent<MouseEvent>(canvas, 'mousemove')
    const down$ = fromEvent<MouseEvent>(canvas, 'mousedown')
    const up$ = fromEvent<MouseEvent>(canvas, 'mouseup')
    const paints$ = down$.pipe(
      mergeMap(down => move$.pipe(takeUntil(up$)))
      // mergeMap(down => move$)
    );



    const offset = getOffset(canvas)

    paints$.subscribe((event) => {
      const clientX = event.clientX - offset.left
      const clientY = event.clientY - offset.top
      this.paintSvc.line({ clientX, clientY })
    });
  }



  // function for the drawing the rectangle.
  private drawRectangle() {
    this.paintSvc.rectangle();
  }

}

function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }

}
