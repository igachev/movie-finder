import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieRequest } from '../../types/MovieTypes';
import { Router } from '@angular/router';

type MovieForm = {
  title: FormControl<string>;
  imgUrl: FormControl<string>;
  description: FormControl<string>;
  genres: FormArray;
}

@Component({
  selector: 'app-create-movie',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss'
})
export class CreateMovieComponent {
  private formBuilder = inject(FormBuilder)
  private movieService = inject(MovieService)
  private router = inject(Router)

  createMovieForm = this.formBuilder.group<MovieForm>({
    title: new FormControl(),
    imgUrl: new FormControl(),
    description: new FormControl(),
    genres: new FormArray([new FormControl("")])
  })

  get genres(): FormArray {
    return this.createMovieForm.get("genres") as FormArray
  }

  addNewGenre() {
    const genresArray = this.createMovieForm.get("genres") as FormArray
    genresArray.push(this.formBuilder.control(""))
  }

  onCreateMovie() {
    const {title,imgUrl,description,genres} = this.createMovieForm.value as MovieRequest;
    const movieRequest: MovieRequest = {title,imgUrl,description,genres}
     this.movieService.createMovie(movieRequest).subscribe({
      next: (res) => {
        this.router.navigate(['/movies'])
      }
     })
  }
}
