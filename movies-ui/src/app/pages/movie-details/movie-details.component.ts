import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { catchError, finalize, map, of, Subscription, switchMap } from 'rxjs';
import { Movie } from '../../types/MovieTypes';
import { CommonModule } from '@angular/common';
import { AddCommentComponent } from "../../components/add-comment/add-comment.component";
import { UserService } from '../../services/user.service';
import { Comment } from '../../types/CommentTypes';
import { FormsModule } from '@angular/forms';
import { EditCommentComponent } from "../../components/edit-comment/edit-comment.component";
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

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
  movieId = this.route.snapshot.params['id']
  loading: WritableSignal<boolean> = signal(true)
  errorMessage: WritableSignal<string> = signal("")
  isLoggedIn: WritableSignal<boolean> = signal(false)
  selectedCommentId!: number | null
  username!: string
  refreshTrigger = signal(0)
     
    movie = toSignal(
      toObservable(this.refreshTrigger).pipe(
    switchMap(() => {
      this.loading.set(true);
      return this.movieService.getMovie(this.movieId).pipe(
        catchError((err) => {
          this.errorMessage.set(err.error);
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      );
    })
  ),
  { initialValue: null }
  );
  

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


}
