import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Movie } from '../../types/MovieTypes';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-movies-card',
  imports: [CommonModule],
  templateUrl: './movies-card.component.html',
  styleUrl: './movies-card.component.scss'
})
export class MoviesCardComponent implements OnInit,OnDestroy {
    _movie!: Movie;
     private router = inject(Router)
     private userService = inject(UserService)
     private movieService = inject(MovieService)
     isAdmin: boolean = false;
     private deleteSubscription!: Subscription
     @Output() deleteMovieEmitter = new EventEmitter<boolean>()

  @Input({required:true}) 
  get movie() {
    return this._movie;
  }
  set movie(value: Movie) {
    this._movie = value;
  }

  ngOnInit(): void {
      this.userService.$userSubjectObservable.subscribe({
        next: (res) => {
          this.isAdmin = res.email === 'admin@abv.bg' ? true : false;
        }
      })
  }

  goToMovie(movieId: number) {
    this.router.navigate(['movies',movieId,'details'])
  }

  goToEditMovie(movieId: number) {
    this.router.navigate(['movies',movieId,'edit'])
  }

  deleteMovie(movieId: number) {
    this.deleteSubscription = this.movieService.deleteMovie(movieId)
    .subscribe({
      next: (res) => {
        this.deleteMovieEmitter.next(true)
      }
    })
  }


  ngOnDestroy(): void {
      this.deleteSubscription?.unsubscribe()
  }

}
