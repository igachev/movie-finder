import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/MovieTypes';
import { forkJoin, map, Observable, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MoviesCardComponent } from "../../components/movies-card/movies-card.component";
import { RouterOutlet } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MoviesCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit,OnDestroy {

    private movieService = inject(MovieService)
    private imageService = inject(ImageService)

    movies: WritableSignal<Movie[]> = signal([]);
    loading: WritableSignal<boolean> = signal(false);
    private pageNumber: number = 1;
    private pageSize: number = 2;
    private moviesSubscription!: Subscription;

    ngOnInit(): void {
     this.getMovies()
    }

    getMovies() {
      this.loading.set(true)
      this.moviesSubscription = this.movieService.getMovies(this.pageNumber,this.pageSize)
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
        this.movies.set(res)
        console.log(this.movies())
      },
      error: (err) => {
        console.log(err.error.errors)
      },
      complete: () => {
        this.loading.set(false)
      }
    })
    }

    nextPage(): void {
        this.pageNumber++
        this.getMovies()
    }

    previousPage(): void {
      if(this.pageNumber === 1) {
        return
      }
      else {
        this.pageNumber--
        this.getMovies()
      }
    }

    movieWasDeleted($event: boolean) {
      this.getMovies()
    }

    ngOnDestroy(): void {
        if(this.moviesSubscription) {
          this.moviesSubscription.unsubscribe()
        }
    }

}
