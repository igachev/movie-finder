import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { FormsModule } from '@angular/forms';
import { CommentRequest } from '../../types/CommentTypes';

@Component({
  selector: 'app-edit-comment',
  imports: [FormsModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.scss'
})
export class EditCommentComponent implements OnInit {
@Input() commentId!: number
@Input() movieId!: number
@Output() commentEmitter = new EventEmitter<string>()
editedComment!: string
commentService = inject(CommentService)

ngOnInit(): void {
    this.commentService.getComment(this.commentId).subscribe({
      next:(res) => {
        this.editedComment = res.content
      }
    })
}

editComment() {
  let commentRequest: CommentRequest = {content: this.editedComment}
  this.commentService.editComment(this.movieId,this.commentId,commentRequest).subscribe({
    next: (res) => {
      this.commentEmitter.next(this.editedComment)
    }
  })
}

}
