import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieRequest } from '../../types/MovieTypes';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";

type MovieForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  genres: FormArray;
}

@Component({
  selector: 'app-create-movie',
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss'
})
export class CreateMovieComponent {

  private formBuilder = inject(FormBuilder)
  private movieService = inject(MovieService)
  private imageService = inject(ImageService)
  private router = inject(Router)
  private fileList!: FileList

  createMovieForm = this.formBuilder.group<MovieForm>({
    title: new FormControl(),
    description: new FormControl(),
    genres: new FormArray([new FormControl("")])
  })

  get genres(): FormArray {
    return this.createMovieForm.get("genres") as FormArray
  }

  onSelectedImages(e: Event) {
    const fileInput = e.target as HTMLInputElement
    if(fileInput.files && fileInput.files.length > 0) {
      this.fileList = fileInput.files;
    }
  }

  addNewGenre() {
    const genresArray = this.createMovieForm.get("genres") as FormArray
    genresArray.push(this.formBuilder.control(""))
  }

  onCreateMovie() {
    const {title,description,genres} = this.createMovieForm.value as MovieRequest;
    const formData = new FormData();
    if(this.fileList && this.fileList?.length > 0) {
      for(let i = 0; i < this.fileList?.length; i++) {
        formData.append("fileCollection",this.fileList[i])
    }
  //   formData.forEach((value, key) => {
  // console.log("KEY:", key, "VALUE:", value);
  // });
    }
    const movieRequest: MovieRequest = {title,description,genres}
    forkJoin(
      [this.movieService.createMovie(movieRequest),
       this.imageService.uploadImages(formData,title)
      ]
     )
     .subscribe({
      next: ([res1,res2]) => {
        this.router.navigate(['/movies'])
      }
     })
  }
}
