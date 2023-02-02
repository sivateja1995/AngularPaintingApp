import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FillType, ALL_FILL_TYPES } from '../../types/drawing-tools/fill-type';

@Component({
  selector: 'app-fill-type-picker',
  templateUrl: './fill-type-picker.component.html',
  styleUrls: ['./fill-type-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FillTypePickerComponent {
  availableFillTypes: FillType[] = ALL_FILL_TYPES;

  @Input()
  selectedFillType!: FillType;
  @Output()
  selectedFillTypeChange: EventEmitter<FillType> = new EventEmitter<FillType>();

  selectFillType(fillType: FillType) {
    this.selectedFillTypeChange.emit(fillType);
  }

  getNgClass(fillType: FillType) {
    const ngClass: any = {};
    ngClass['app-fill-type-picker__option--selected'] =
      this.selectedFillType === fillType;
    ngClass['app-fill-type-picker__option--' + FillType[fillType] + 'Icon'] =
      true;

    return ngClass;
  }
}
