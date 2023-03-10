import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 







@NgModule({
  imports: [
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconTestingModule,
    MatButtonToggleModule,
  ],
  exports: [
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconTestingModule,
    MatButtonToggleModule,
  ],
})
export class MaterialModule {}
