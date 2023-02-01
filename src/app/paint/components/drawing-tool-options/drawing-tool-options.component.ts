import { FillType } from './../../types/drawing-tools/fill-type';
import { DrawingToolOptions } from './../../types/drawing-tools/drawing-tool-options';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DrawingToolType } from '../../types/drawing-tools/drawing-tool-type';
import { isDefined } from '../../helpers/typescript.helpers';

@Component({
  selector: 'app-drawing-tool-options',
  templateUrl: './drawing-tool-options.component.html',
  styleUrls: ['./drawing-tool-options.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawingToolOptionsComponent implements OnChanges {
  @Input()
  selectedTool: DrawingToolType = DrawingToolType.rectangle;
  @Input()
  options!: DrawingToolOptions;
  @Output()
  optionsChange: EventEmitter<Partial<DrawingToolOptions>> = new EventEmitter<
    Partial<DrawingToolOptions>
  >();

  displayedPicker: 'fillTypePicker' | undefined = undefined;
  selectedFillType: FillType| undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedPicker = undefined;
    this.selectedFillType = undefined;

    if ([DrawingToolType.rectangle].includes(this.selectedTool as DrawingToolType)) {
      this.displayedPicker = 'fillTypePicker';
      this.selectedFillType = this.options[6].fillType;
      console.log(this.selectedFillType);
    }
  }

  changeSelectedFillType(fillType: FillType) {
    console.log(fillType, fillType);
    const changes: Partial<DrawingToolOptions> = {};

    if ([DrawingToolType.rectangle].includes(this.selectedTool as DrawingToolType)) {
      if (isDefined(this.selectedTool)) {
        changes[6] = { fillType };
      }
    }

    this.optionsChange.emit(changes);
  }


  get _selectedFillType(): FillType{
    return this.selectedFillType as FillType;
  }
}
