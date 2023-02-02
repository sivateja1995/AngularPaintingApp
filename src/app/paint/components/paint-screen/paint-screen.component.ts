import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TsPaintStore } from 'src/app/paint/services/paint.store';
import { isDefined } from '../../helpers/typescript.helpers';
import { DrawingToolType } from '../../types/drawing-tools/drawing-tool-type';
import { DrawingTool } from '../../types/drawing-tools/drawing-tool';
import { MenuItem } from '../../types/menu/menu-item';
import { MenuActionType } from '../../types/menu/menu-action-type';
import { Utils } from '../../helpers/utils';
import { PaintService } from '../../services/paint.service';

@Component({
  selector: 'app-paint-screen',
  templateUrl: './paint-screen.component.html',
  styleUrls: ['./paint-screen.component.css'],
})
export class PaintScreenComponent implements OnInit {
  public menuItem!: MenuItem;
  constructor(
    public store: TsPaintStore,
    private activatedRoute: ActivatedRoute,
    private utils: Utils,
    private paintService: PaintService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (isDefined(params['imageUrl'])) {
        store.loadFileFromUrl(params['imageUrl']);
      }
    });
  }

  ngOnInit(): void {
    this.store.setDrawingTool(DrawingToolType.line);
  }

  @HostListener('document:paste', ['$event'])
  onPaste(event: any) {
    const pastedFile: File = event.clipboardData.items[0].getAsFile();

    this.store.pasteFile(pastedFile);
  }

  @HostListener('dragover', ['$event'])
  onDragover(event: any) {
    // We need to prevent default handling of dragover event in order to process the drop event
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const pastedFile: File = event.dataTransfer.items[0].getAsFile();

    this.store.loadFile(pastedFile);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunload(event: any) {
    if (this.store.state.unsavedChanges) {
      event.returnValue = true;
    }
  }

  get isInverted(): boolean {
    return this.store.state.selectedDrawingTool?.invertedPreview ?? false;
  }

  // get selected tool type
  get selectedToolType(): DrawingToolType {
    return (this.store.state.selectedDrawingTool as DrawingTool).type;
  }

  // funcitons for save and clear
  public save(data: Event) {
    this.store.executeMenuAction(MenuActionType.SAVE_FILE);
  }

  public clear(data: Event) {
    this.store.executeMenuAction(MenuActionType.CLEAR_IMAGE);
  }

  // funmcitons for undo & Redo
  public undo() {
    this.store.executeMenuAction(MenuActionType.UNDO);
  }

  public redo() {
    this.store.executeMenuAction(MenuActionType.REPEAT);
  }

  public submit() {
    this.store.executeMenuAction(MenuActionType.SUBMIT);
    if (!!this.utils.getImageFile()) {
      const imageFile = this.utils.getImageFile();
      this.paintService.saveImage(imageFile).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
