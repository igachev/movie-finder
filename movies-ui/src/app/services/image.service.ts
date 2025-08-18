import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImages(formData: FormData,movieTitle: string) {
    return this.http.put<any>(`http://localhost:5174/api/images/upload?movieTitle=${movieTitle}`,formData)
  }

}
