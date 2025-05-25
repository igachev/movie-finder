import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Movie } from '../types/MovieTypes';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

 

  constructor(
    private http: HttpClient
  ) { }

  getMovies(pageNumber: number,pageSize: number) {
   return this.http.get<Movie[]>(`http://localhost:5174/movies?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }


}
