import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../types/MovieTypes';
import { CommonModule } from '@angular/common';
import { AddCommentComponent } from "../../components/add-comment/add-comment.component";
import { UserService } from '../../services/user.service';
import { Comment } from '../../types/CommentTypes';
import { FormsModule } from '@angular/forms';
import { EditCommentComponent } from "../../components/edit-comment/edit-comment.component";

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, AddCommentComponent, FormsModule, EditCommentComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit,OnDestroy {


  private route = inject(ActivatedRoute)
  private movieService = inject(MovieService)
  private userService = inject(UserService)
  private movieSubscription!: Subscription
  movie: WritableSignal<Movie | null> = signal(null)
  loading: WritableSignal<boolean> = signal(false)
  errorMessage: WritableSignal<string> = signal("")
  isLoggedIn: WritableSignal<boolean> = signal(false)
  selectedCommentId!: number | null
  username!: string

  ngOnInit(): void {
      this.getMovie()
      this.userService.$userSubjectObservable.subscribe({
        next: (res) => {
          res.token !== "" ? this.isLoggedIn.set(true) : this.isLoggedIn.set(false);
          this.username = res.userName;
        }
      })
  }

  getMovie() {
    let movieId = this.route.snapshot.params['id']
    this.loading.set(true)
    this.movieSubscription = this.movieService.getMovie(movieId).subscribe({
       next: (res) => {
        this.movie.set(res)
        console.log(this.movie())
      },
      error: (err) => {
        this.errorMessage.set(err.error)
      },
      complete: () => {
        this.loading.set(false)
      }
    })
  }

  receivedComment($event: Comment) {
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

  ngOnDestroy(): void {
    this.movieSubscription?.unsubscribe()    
  }

}
