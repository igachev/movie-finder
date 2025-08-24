import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { EditMovieRequest, Movie, MovieRequest } from '../types/MovieTypes';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

   filteredMovies: WritableSignal<Movie[]> = signal([])
   imageService = inject(ImageService)

  constructor(
    private http: HttpClient
  ) { }

  getMovies(pageNumber: number,pageSize: number): Observable<Movie[]> {
   return this.http.get<Movie[]>(`http://localhost:5174/movies?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  getMovie(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:5174/movies/${movieId}`)
  }

  filterMoviesByGenre(pageNumber: number,pageSize: number,genreName: string): void {
   this.http.get<Movie[]>(`http://localhost:5174/movies/filterByGenre?pageNumber=${pageNumber}&pageSize=${pageSize}&genreName=${genreName}`)
   .pipe(
           switchMap((movies) => {
           const moviesAndImages = movies.map((movie) => {
               return this.imageService.getImages(movie.title).pipe(
                 map((images) => {
                   return {...movie, firstImg: images.images[0]}
                 })
               )
             })
             return forkJoin(moviesAndImages)// one big observable with array of results
           })
         )
   .subscribe({
    next: (res) => {
      this.filteredMovies.set(res)
    }
   })
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
