import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Utils {
  constructor() {}
  private ImageFile!: File;

  public setImageFile(file: File) {
    this.ImageFile = file;
  }

  public getImageFile() {
    return this.ImageFile;
  }
}
