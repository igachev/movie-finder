import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../types/MovieTypes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-movie',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})
export class EditMovieComponent implements OnInit, OnDestroy {

  private formBuilder = inject(FormBuilder)
  private movieService = inject(MovieService)
  private route = inject(ActivatedRoute)
  movie!: Movie
  private movieSubscription!: Subscription

  editMovieForm = this.formBuilder.group({
    title: new FormControl(),
    imgUrl: new FormControl(),
    description: new FormControl(),
    genres: new FormArray([])
  })

  get genres(): FormArray {
    return this.editMovieForm.get("genres") as FormArray
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id']
      this.movieSubscription = this.movieService.getMovie(movieId).subscribe({
        next: (res) => {
          this.movie = res;

          this.genres.clear()
          res.genres.forEach((genre) => {
            this.genres.push(new FormControl(genre.genreName))
          })

          this.editMovieForm.patchValue({
            title: res.title,
            imgUrl: res.imgUrl,
            description: res.description
          })
        }
      })
  }

  onEditMovie() {
throw new Error('Method not implemented.');
}

ngOnDestroy(): void {
    this.movieSubscription?.unsubscribe()
}

}
