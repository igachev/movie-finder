import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, CommentRequest } from '../types/CommentTypes';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  addComment(movieId: number,commentRequest: CommentRequest) {
    return this.http.post<Comment>(`http://localhost:5174/comments/${movieId}`,commentRequest)
  }
}
