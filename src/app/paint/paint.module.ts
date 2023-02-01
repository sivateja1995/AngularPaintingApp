import { FillTypePickerComponent } from './components/fill-type-picker/fill-type-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaintScreenComponent } from './components/paint-screen/paint-screen.component';
import { PaintToolbarComponent } from './components/paint-toolbar/paint-toolbar.component';
import { PaintToolsSidebarComponent } from './components/paint-tools-sidebar/paint-tools-sidebar.component';
import { PaintColorPalletComponent } from './components/paint-color-pallet/paint-color-pallet.component';
import { SharedModule } from '../shared/shared.module';
import { PaintService } from './services/paint.service';
import { PaintSectionComponent } from './components/paint-section/paint-section.component';
import { ZoomableCanvasComponent } from './components/zoomable-canvas/zoomable-canvas.component';
import { SelectionFrameComponent } from './components/selection-frame/selection-frame.component';
import { MouseTrackerComponent } from './components/mouse-tracker/mouse-tracker.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { DrawingToolOptionsComponent } from './components/drawing-tool-options/drawing-tool-options.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { ImageScrollerComponent } from './components/scroller/image-scroller.component';
import { StretchSkewWindowComponent } from './components/stretch-skew-window/stretch-skew-window.component';
import { IntegerInputComponent } from './components/integer-input/integer-input.component';

const paintRoutes: Routes = [
  {
    path: '',
    component: PaintScreenComponent,
  },
];

@NgModule({
  declarations: [
    PaintScreenComponent,
    PaintToolbarComponent,
    PaintToolsSidebarComponent,
    PaintColorPalletComponent,
    PaintSectionComponent,
    ZoomableCanvasComponent,
    SelectionFrameComponent,
    MouseTrackerComponent,
    ToolboxComponent,
    DrawingToolOptionsComponent,
    FillTypePickerComponent,
    ModalWindowComponent,
    ImageScrollerComponent,
    StretchSkewWindowComponent,
    IntegerInputComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(paintRoutes), SharedModule],
  providers: [PaintService],
})
export class PaintModule {}
