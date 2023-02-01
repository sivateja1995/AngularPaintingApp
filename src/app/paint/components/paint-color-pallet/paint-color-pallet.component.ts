import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Color } from '../../types/base/color';
import { ColorSelection } from '../../types/base/color-selection';

@Component({
  selector: 'app-paint-color-pallet',
  templateUrl: './paint-color-pallet.component.html',
  styleUrls: ['./paint-color-pallet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaintColorPalletComponent {
  @Input()
  selectedPrimaryColor!: Color;
  @Input()
  selectedSecondaryColor!: Color;
  @Input()
  availableColors!: Color[];
  @Output()
  selectedColorChange: EventEmitter<ColorSelection> =
    new EventEmitter<ColorSelection>();

  selectColor(event: MouseEvent, color: Color) {
    event.preventDefault();
    const primary: boolean = event.button === 0;
    this.selectedColorChange.emit({ color, primary });
  }

  getRgb(color: Color) {
    return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
  }
}
