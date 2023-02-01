import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ALL_DRAWING_TOOL_TYPES, DrawingToolType } from '../../types/drawing-tools/drawing-tool-type';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
})
export class ToolboxComponent  {
  availableTools: DrawingToolType[] = ALL_DRAWING_TOOL_TYPES;

  @Input()
  selectedTool!: DrawingToolType;
  @Output()
  selectedToolChange: EventEmitter<DrawingToolType> =
    new EventEmitter<DrawingToolType>();

  selectTool(tool: DrawingToolType) {
    console.log(tool);
    this.selectedToolChange.emit(tool);
  }

  getNgClass(tool: DrawingToolType) {
    const ngClass: any = {};
    ngClass['tsp-toolbox__button--selected'] = this.selectedTool === tool;
    ngClass['tsp-toolbox__button--' + DrawingToolType[tool] + 'Icon'] = true;

    return ngClass;
  }
}
