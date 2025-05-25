import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/MovieTypes';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MoviesCardComponent } from "../../components/movies-card/movies-card.component";

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MoviesCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit,OnDestroy {
    private movieService = inject(MovieService)

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
      this.moviesSubscription = this.movieService.getMovies(this.pageNumber,this.pageSize).subscribe({
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

    ngOnDestroy(): void {
        if(this.moviesSubscription) {
          this.moviesSubscription.unsubscribe()
        }
    }

}
