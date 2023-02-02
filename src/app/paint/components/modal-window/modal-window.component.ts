import { Component, OnChanges, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWindowComponent implements OnChanges {
  @Input()
  title!: string;
  @Input()
  fullscreen: boolean = false;
  @Input()
  closable: boolean = false;
  @Input()
  icon: 'paint' | undefined;
  @Output()
  closeClicked: EventEmitter<void> = new EventEmitter<void>();

  iconClass: any;

  ngOnChanges(): void {
    if (this.icon === 'paint') {
      this.iconClass = { 'app-modal-window__title-bar-icon--paint': true };
    } else {
      this.iconClass = {};
    }
  }
}
