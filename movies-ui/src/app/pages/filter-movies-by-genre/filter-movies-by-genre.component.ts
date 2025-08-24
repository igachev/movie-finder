import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
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
export class FilterMoviesByGenreComponent implements OnInit {
 
  private movieService = inject(MovieService)
  pageNumber = signal(1)
  pageSize = signal(2)
  currentGenre = signal("")
  filteredMovies: WritableSignal<Movie[]> = this.movieService.filteredMovies

  constructor() {
    effect(() => {
      this.pageNumber()
      this.currentGenre()
      if(this.currentGenre() === '') return;
      this.movieService.filterMoviesByGenre(this.pageNumber(),this.pageSize(),this.currentGenre());
    })
  }

  ngOnInit(): void {
    this.filteredMovies.set([])
  }


  onSearch(searchForm: NgForm) {
  const { genreName } = searchForm.value;
  this.currentGenre.set(genreName);
  if(this.currentGenre() === '') return;
    this.pageNumber.set(1);
}

nextPage() {
  this.pageNumber.update((currentPage) => currentPage + 1)
}

previousPage() {
  this.pageNumber.update((currentPage) => currentPage - 1)
}

}
