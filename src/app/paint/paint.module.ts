import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaintScreenComponent } from './components/paint-screen/paint-screen.component';
import { PaintToolbarComponent } from './components/paint-toolbar/paint-toolbar.component';
import { PaintToolsSidebarComponent } from './components/paint-tools-sidebar/paint-tools-sidebar.component';
import { PaintColorPalletComponent } from './components/paint-color-pallet/paint-color-pallet.component';
import { SharedModule } from '../shared/shared.module';

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
    PaintColorPalletComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(paintRoutes),
    SharedModule
  ]
})
export class PaintModule { }
