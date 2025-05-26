import { Component, inject, Input } from '@angular/core';
import { Movie } from '../../types/MovieTypes';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-card',
  imports: [CommonModule],
  templateUrl: './movies-card.component.html',
  styleUrl: './movies-card.component.scss'
})
export class MoviesCardComponent {
    _movie!: Movie;
     private router = inject(Router)

  @Input({required:true}) 
  get movie() {
    return this._movie;
  }
  set movie(value: Movie) {
    this._movie = value;
  }

  goToMovie(movieId: number) {
    this.router.navigate(['movies',movieId,'details'])
  }

}
