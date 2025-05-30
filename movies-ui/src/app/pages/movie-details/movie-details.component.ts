import { Component, effect, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { catchError, finalize, map, of, shareReplay, Subscription, switchMap, take } from 'rxjs';
import { Movie } from '../../types/MovieTypes';
import { CommonModule } from '@angular/common';
import { AddCommentComponent } from "../../components/add-comment/add-comment.component";
import { UserService } from '../../services/user.service';
import { Comment } from '../../types/CommentTypes';
import { FormsModule } from '@angular/forms';
import { EditCommentComponent } from "../../components/edit-comment/edit-comment.component";
import { CommentService } from '../../services/comment.service';

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
  movieId = this.route.snapshot.params['id']
  movie: WritableSignal<Movie | null> = signal(null)
  loading: WritableSignal<boolean> = signal(true)
  errorMessage: WritableSignal<string> = signal("")
  isLoggedIn: WritableSignal<boolean> = signal(false)
  selectedCommentId!: number | null
  username!: string
  refreshTrigger = signal<number>(0);
     
  constructor() {
    effect(() => {
 // track the refresh trigger.Anytime the value of refreshTrigger changes the effect automatically re-run
  this.refreshTrigger() 
  this.loading.set(true);
  this.errorMessage.set('');
  
  this.movieService.getMovie(this.movieId).pipe(
    catchError((err) => {
      this.errorMessage.set(err.error);
      return of(null);
    }),
    finalize(() => this.loading.set(false))
  ).subscribe((res) => {
    this.movie.set(res);
  });
});
  }
  

  ngOnInit(): void {
      this.userService.$userSubjectObservable.subscribe({
        next: (res) => {
          res.token !== "" ? this.isLoggedIn.set(true) : this.isLoggedIn.set(false);
          this.username = res.userName;
        }
      })
  }


  commentWasAdded($event: Comment) {
   this.refreshTrigger.update((prevValue) => prevValue + 1)
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
  this.refreshTrigger.update((prevValue) => prevValue + 1)
  this.selectedCommentId = null
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next:(res) => {
        this.refreshTrigger.update((prevValue) => prevValue + 1)
      }
    })
  }

  
}
