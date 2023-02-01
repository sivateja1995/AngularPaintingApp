import { Component, OnInit, OnChanges, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { validateMinMax } from '../../helpers/numeric.helpers';
import { simulateTextChange } from '../../helpers/text-input.helpers';

@Component({
  selector: 'app-integer-input',
  templateUrl: './integer-input.component.html',
  styleUrls: ['./integer-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegerInputComponent implements OnChanges {
  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef;

  @Input()
  label: string = '';
  @Input()
  unit: string = '';
  @Input()
  value: number=0;
  @Input()
  minValue: number = 0;
  @Input()
  maxValue: number = Number.MAX_SAFE_INTEGER;
  @Input()
  disabled: boolean = false;
  @Output()
  valueChange: EventEmitter<number> = new EventEmitter<number>();

  model!: string;

  private _validInputRegex: RegExp = new RegExp(`^(\\d+)?$`);
  private _inputValidators: ((value: string) => boolean)[] = [
    this.validateRegex.bind(this),
    this.validateMinMax.bind(this),
  ];
  private _isModelLocked: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !this._isModelLocked) {
      this.model = this.value + '';
    }
  }

  onKeydown(event: KeyboardEvent) {
    this.processInputEvent(event);
  }

  onPaste(event: ClipboardEvent) {
    this.processInputEvent(event);
  }

  focus() {
    setTimeout(() => {
      this.inputElement.nativeElement.select();
    });
  }

  private processInputEvent(event: KeyboardEvent | ClipboardEvent) {
    const nextModel: string = simulateTextChange(this.model, event);

    if (this.isInputValid(nextModel)) {
      this._isModelLocked = true;
      this.valueChange.emit(Number(nextModel));
    } else {
      event.preventDefault();
    }
    event.stopPropagation();
  }

  private isInputValid(value: string): boolean {
    return this._inputValidators.every((v) => v(value));
  }

  private validateRegex(value: string): boolean {
    return this._validInputRegex.test(value);
  }

  private validateMinMax(value: string): boolean {
    return validateMinMax(Number(value), this.minValue, this.maxValue);
  }
}
