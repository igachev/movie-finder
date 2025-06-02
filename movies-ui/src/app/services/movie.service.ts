import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { EditMovieRequest, Movie, MovieRequest } from '../types/MovieTypes';
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
   return this.http.get<Movie[]>(`http://localhost:5174/movies/filterByGenre?pageNumber=${pageNumber}&pageSize=${pageSize}&genreName=${genreName}`)
  }

  createMovie(movieRequest: MovieRequest) {
    return this.http.post<Movie>("http://localhost:5174/movies",movieRequest)
  }

  editMovie(movieId: number, movieRequest: EditMovieRequest) {
    return this.http.put<Movie>(`http://localhost:5174/movies/${movieId}`,movieRequest)
  }
  
  deleteMovie(movieId: number) {
    return this.http.delete(`http://localhost:5174/movies/${movieId}`)
  }

}
