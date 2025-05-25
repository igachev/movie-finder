import { Component, Input } from '@angular/core';
import { Movie } from '../../types/MovieTypes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-card',
  imports: [CommonModule],
  templateUrl: './movies-card.component.html',
  styleUrl: './movies-card.component.scss'
})
export class MoviesCardComponent {
    _movie!: Movie;

  @Input({required:true}) 
  get movie() {
    return this._movie;
  }
  set movie(value: Movie) {
    this._movie = value;
  }

}
