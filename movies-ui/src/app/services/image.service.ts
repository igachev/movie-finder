import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type ImageUrl = {
  images: string[];
}

type ImageResponse = {
  message: string;
}

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

  getImages(movieTitle: string): Observable<ImageUrl> {
    return this.http.get<ImageUrl>(`http://localhost:5174/api/images?movieTitle=${movieTitle}`)
  }

  deleteImages(movieTitle: string): Observable<ImageResponse> {
    return this.http.get<ImageResponse>(`http://localhost:5174/api/images/remove-all?movieTitle=${movieTitle}`)
  }

}
