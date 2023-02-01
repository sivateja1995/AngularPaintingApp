import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { StretchSkewParams } from '../../types/action-params/stretch-skew-params';
import { IntegerInputComponent } from '../integer-input/integer-input.component';

@Component({
  selector: 'app-stretch-skew-window',
  templateUrl: './stretch-skew-window.component.html',
  styleUrls: ['./stretch-skew-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StretchSkewWindowComponent implements OnInit {
  @ViewChild('stretchHorizontalInput', { static: true })
  stretchHorizontalInput!: IntegerInputComponent;

  @Output()
  saveChanges: EventEmitter<StretchSkewParams> =
    new EventEmitter<StretchSkewParams>();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  stretchHorizontal: number = 100;
  stretchVertical: number = 100;

  ngOnInit(): void {
    this.stretchHorizontalInput.focus();
  }

  okClicked() {
    this.saveChanges.emit({
      stretch: {
        horizontal: this.stretchHorizontal,
        vertical: this.stretchVertical,
      },
    });
  }
}
