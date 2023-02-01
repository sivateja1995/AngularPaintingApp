import { DrawingToolType } from './../../types/drawing-tools/drawing-tool-type';
import { Component, OnInit } from '@angular/core';
import { PaintService } from '../../services/paint.service';
import { TsPaintStore } from '../../services/paint.store';
import { DrawingTool } from '../../types/drawing-tools/drawing-tool';

@Component({
  selector: 'app-paint-tools-sidebar',
  templateUrl: './paint-tools-sidebar.component.html',
  styleUrls: ['./paint-tools-sidebar.component.css'],
})
export class PaintToolsSidebarComponent implements OnInit {
  public color: any;

  constructor(public store: TsPaintStore) {}

  ngOnInit(): void { }

  // get selected tool type
  get selectedToolType(): DrawingToolType{
    return (this.store.state.selectedDrawingTool as DrawingTool).type;
  }
}
