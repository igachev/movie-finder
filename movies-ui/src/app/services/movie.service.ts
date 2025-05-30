import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Movie } from '../types/MovieTypes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

 

  constructor(
    private http: HttpClient
  ) { }

  getMovies(pageNumber: number,pageSize: number): Observable<Movie[]> {
   return this.http.get<Movie[]>(`http://localhost:5174/movies?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  getMovie(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:5174/movies/${movieId}`)
  }

  filterMoviesByGenre(pageNumber: number,pageSize: number,genreName: string): Observable<Movie[]> {
   return this.http.get<Movie[]>(`http://localhost:5174/movies?pageNumber=${pageNumber}&pageSize=${pageSize}&genreName=${genreName}`)
  }
}
