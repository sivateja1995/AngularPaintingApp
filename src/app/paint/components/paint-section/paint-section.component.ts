import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { mergeMap, takeUntil, switchMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { PaintService } from '../../services/paint.service';

@Component({
  selector: 'app-paint-section',
  template: `
    <canvas #mount></canvas>
  `,
  styleUrls: ['./paint-section.component.css']
})
export class PaintSectionComponent implements OnInit, AfterViewInit {

  constructor(private paintSvc: PaintService, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.paintSvc.initialize(this.elRef.nativeElement)
    this.startPainting()
  }


  ngAfterViewInit(): void {

  }

  private startPainting() {
    const { nativeElement } = this.elRef;
    const canvas = nativeElement.querySelector('canvas') as HTMLCanvasElement
    const move$ = fromEvent<MouseEvent>(canvas, 'mousemove')
    const down$ = fromEvent<MouseEvent>(canvas, 'mousedown')
    const up$ = fromEvent<MouseEvent>(canvas, 'mouseup')
    const paints$ = down$.pipe(
      mergeMap(down => move$.pipe(takeUntil(up$)))
      // mergeMap(down => move$)
    );

    down$.subscribe(console.info)

    const offset = getOffset(canvas)

    paints$.subscribe((event) => {
      const clientX = event.clientX - offset.left
      const clientY = event.clientY - offset.top
      this.paintSvc.paint({ clientX, clientY })
    });
  }

}

function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }

}
