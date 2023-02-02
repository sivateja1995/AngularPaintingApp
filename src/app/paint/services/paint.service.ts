import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
  
  
export class PaintService {
  constructor(private http: HttpClient) { }
  private ImageUrl = environment.backendUrl + '/Image';
  public imageFile!: File 

  // api to save image to db 
  saveImage(file: File): Observable<any>{
    return this.http.post<any>(this.ImageUrl, file);
  }
}
