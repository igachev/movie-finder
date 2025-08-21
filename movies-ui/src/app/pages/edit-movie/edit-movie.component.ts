import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditMovieRequest, Movie, MovieRequest } from '../../types/MovieTypes';
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
  private router = inject(Router)
  private movieSubscription!: Subscription
  private editMovieSubscription!: Subscription

  editMovieForm = this.formBuilder.group({
    title: new FormControl(),
    description: new FormControl(),
    genres: new FormArray<FormControl<string>>([])
  })

  get genres(): FormArray {
    return this.editMovieForm.get("genres") as FormArray
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id']
      this.movieSubscription = this.movieService.getMovie(movieId).subscribe({
        next: (res) => {

          this.genres.clear()
          res.genres.forEach((genre) => {
            this.genres.push(new FormControl(genre.genreName))
          })

          this.editMovieForm.patchValue({
            title: res.title,
            description: res.description
          })
        }
      })
  }

  onEditMovie() {
  const movieId = this.route.snapshot.params['id']
  const { title,description } = this.editMovieForm.value;
  const genres = this.genres.controls.map((g) => g.value)
  const editMovieRequest: EditMovieRequest = { title,description,genres: genres }
  this.editMovieSubscription = this.movieService.editMovie(movieId,editMovieRequest).subscribe({
    next: (res) => {
      this.router.navigate(['movies',movieId,'details'])
    }
  })
}

ngOnDestroy(): void {
    this.movieSubscription?.unsubscribe()
    this.editMovieSubscription?.unsubscribe()
}

}
