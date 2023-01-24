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
        MatMenuModule
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
        MatMenuModule
    ],
})
export class MaterialModule { }