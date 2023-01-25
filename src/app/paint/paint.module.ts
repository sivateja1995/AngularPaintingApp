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

const paintRoutes: Routes = [
  {
    path: '',
    component: PaintScreenComponent
  }
]

@NgModule({
  declarations: [
    PaintScreenComponent,
    PaintToolbarComponent,
    PaintToolsSidebarComponent,
    PaintColorPalletComponent,
    PaintSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(paintRoutes),
    SharedModule
  ],
  providers: [PaintService]
})
export class PaintModule { }
