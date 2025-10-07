import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Comment, CommentRequest } from '../../types/CommentTypes';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-add-comment',
  imports: [FormsModule, LoadingSpinnerComponent],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss'
})
export class AddCommentComponent implements OnDestroy {
//  userService = inject(UserService)
 private route = inject(ActivatedRoute)
 private commentService = inject(CommentService)
 private addCommentSubscription!: Subscription
 @Output() commentEmitter = new EventEmitter<Comment>()

onAddComment(addCommentForm: NgForm) {
  const movieId = this.route.snapshot.params['id']
  const {content} = addCommentForm.value
  const commentRequest: CommentRequest = {content}
  this.addCommentSubscription = this.commentService.addComment(movieId,commentRequest).subscribe({
    next:(res) => {
      this.commentEmitter.next(res)
      addCommentForm.reset()
    }
  })
  
}

ngOnDestroy(): void {
    this.addCommentSubscription?.unsubscribe()
}

}
