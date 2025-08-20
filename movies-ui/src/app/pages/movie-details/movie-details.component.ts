import { AfterViewInit, Component, effect, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { catchError, finalize, map, of, shareReplay, Subscription, switchMap, take, tap } from 'rxjs';
import { Movie } from '../../types/MovieTypes';
import { CommonModule } from '@angular/common';
import { AddCommentComponent } from "../../components/add-comment/add-comment.component";
import { UserService } from '../../services/user.service';
import { Comment } from '../../types/CommentTypes';
import { FormsModule } from '@angular/forms';
import { EditCommentComponent } from "../../components/edit-comment/edit-comment.component";
import { CommentService } from '../../services/comment.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, AddCommentComponent, FormsModule, EditCommentComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private movieService = inject(MovieService)
  private userService = inject(UserService)
  private commentService = inject(CommentService)
  private imageService = inject(ImageService)
  movieId = this.route.snapshot.params['id']
  movie!: Movie
  loading!: boolean
  errorMessage!: string 
  isLoggedIn: boolean = false
  selectedCommentId!: number | null
  username!: string
  images!: string[]

  getMovie() {
    this.loading = true;
    this.movieService.getMovie(this.movieId)
    .pipe(
      switchMap((movie) => {
   return this.imageService.getImages(movie.title).pipe(
     tap((images) => {
      this.images = images.images
     }),
     map(() => movie)
    )
  }),
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (res) => {
        this.movie = res;
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    })
  }

  ngOnInit(): void {

      this.userService.$userSubjectObservable.subscribe({
        next: (res) => {
          res.token !== "" ? this.isLoggedIn = true : this.isLoggedIn = false;
          this.username = res.userName;
        }
      });

      this.getMovie();
  }

  commentWasAdded($event: Comment) {
    this.getMovie()
  }

  showHideEdit(e:Event,commentId: number) {
    let btnText = (e.target as HTMLButtonElement).innerText
    if(btnText === 'Cancel') {
      this.selectedCommentId = null
    }
    else {
      this.selectedCommentId = commentId
    }
  }

  commentWasEdited($event: string) {
    this.getMovie()
    this.selectedCommentId = null
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next:(res) => {
        this.getMovie()
      }
    })
  }

  trackByImageIndex(i: number, _:any): number {
    return i;
  }

  trackByCommentId(index: number, comment: Comment) {
    return comment.id;
  }
  
}
