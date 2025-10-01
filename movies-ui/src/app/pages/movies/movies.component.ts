import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/MovieTypes';
import { forkJoin, map, Observable, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MoviesCardComponent } from "../../components/movies-card/movies-card.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MoviesCardComponent,LoadingSpinnerComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit,OnDestroy {

    private movieService = inject(MovieService)
    private imageService = inject(ImageService)
    movies: WritableSignal<Movie[]> = signal([]);
    private pageNumber: number = 1;
    private pageSize: number = 2;
    private moviesSubscription!: Subscription;
    errorMessage!: string;
    private router = inject(Router)
    private route = inject(ActivatedRoute)

    ngOnInit(): void {
     this.getMovies()
      this.updatePageParameters()
     
    }

    getMovies() {
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
        this.errorMessage = ''
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = "Error occured.Movies not found."
      },
      complete: () => {
      }
    })
    }

    nextPage(): void {
        this.pageNumber++
        this.getMovies()
        this.updatePageParameters()
    }

    previousPage(): void {
      if(this.pageNumber === 1) {
        return
      }
      else {
        this.pageNumber--
        this.getMovies()
        this.updatePageParameters()
      }
    }

    movieWasDeleted($event: boolean) {
      this.getMovies()
    }

    updatePageParameters() {
      this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {pageNumber: this.pageNumber, pageSize: this.pageSize},
        queryParamsHandling: 'merge'
      }
     );
    }

    ngOnDestroy(): void {
        if(this.moviesSubscription) {
          this.moviesSubscription.unsubscribe()
        }
    }

}
