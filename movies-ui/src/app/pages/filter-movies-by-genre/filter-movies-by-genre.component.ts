import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/MovieTypes';
import { CommonModule } from '@angular/common';
import { MoviesCardComponent } from "../../components/movies-card/movies-card.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-movies-by-genre',
  imports: [FormsModule, CommonModule, MoviesCardComponent],
  templateUrl: './filter-movies-by-genre.component.html',
  styleUrl: './filter-movies-by-genre.component.scss'
})
export class FilterMoviesByGenreComponent {
 
  private movieService = inject(MovieService)
  pageNumber = signal(1)
  pageSize = signal(2)
  currentGenre = signal("")
  movies: WritableSignal<Movie[]> = signal([])

  constructor() {
    effect(() => {
      if(this.currentGenre() === '') return; // avoid triggering the effect
      this.pageNumber() // keep track of the page number.If it changes rerun the effect
this.movieService.filterMoviesByGenre(this.pageNumber(),this.pageSize(),this.currentGenre())
.pipe(takeUntilDestroyed()) // It ensures your .subscribe() is automatically unsubscribed Every time your effect() re-runs due to signal changes
.subscribe({
    next: (res) => {
      this.movies.set(res)
    }
  })
    })
  }

  onSearch(searchForm: NgForm) {
  const { genreName } = searchForm.value;
  this.currentGenre.set(genreName)
  this.pageNumber.set(1)
}

nextPage() {
  this.pageNumber.update((currentPage) => currentPage + 1)
}

previousPage() {
  this.pageNumber.update((currentPage) => currentPage - 1)
}

}
