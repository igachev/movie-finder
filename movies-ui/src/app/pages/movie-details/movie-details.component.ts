import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../types/MovieTypes';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit,OnDestroy {
  private route = inject(ActivatedRoute)
  private movieService = inject(MovieService)
  private movieSubscription!: Subscription
  movie: WritableSignal<Movie | null> = signal(null)
  loading: WritableSignal<boolean> = signal(false)

  ngOnInit(): void {
      this.getMovie()
  }

  getMovie() {
    let movieId = this.route.snapshot.params['id']
    this.loading.set(true)
    this.movieSubscription = this.movieService.getMovie(movieId).subscribe({
       next: (res) => {
        this.movie.set(res)
        console.log(this.movie())
      },
      error: (err) => {
        console.log(err.error.errors)
      },
      complete: () => {
        this.loading.set(false)
      }
    })
  }

  ngOnDestroy(): void {
    this.movieSubscription?.unsubscribe()    
  }

}
