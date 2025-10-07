import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';
import { createMock } from '@testing-library/angular/jest-utils';
import { CommentService } from '../../services/comment.service';
import { render,screen } from '@testing-library/angular';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import userEvent from '@testing-library/user-event';
import { MovieDetailsComponent } from '../../pages/movie-details/movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommentRequest } from '../../types/CommentTypes';

describe('AddCommentComponent', () => {
  
  const mockCommentResponse = { id: 10, content: "my comment" };

  const mockCommentService = {
    addComment: jest.fn((id: number,commentRequest: CommentRequest) => of(mockCommentResponse))
  };
  const mockCommentEmitter = jest.fn();
  const user = userEvent.setup();

  test("should contain label with text 'write your comment...'", async() => {

    await render(AddCommentComponent, {
      declarations: [
        LoadingSpinnerComponent
      ],
      on: {
        commentEmitter: mockCommentEmitter
      },
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService
        }
      ]
    });

    const labelText = await screen.findByText("Write your comment...")
    expect(labelText).toBeInTheDocument()
  });

  test("should have textarea html element", async() => {

    await render(AddCommentComponent, {
      declarations: [
        LoadingSpinnerComponent
      ],
      on: {
        commentEmitter: mockCommentEmitter
      },
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService
        }
      ]
    });

    const textAreaElement = await screen.getByRole("textbox",{name: "Write your comment..."})
    // const textAreaElement = screen.getByLabelText(/write your comment.../i);
    expect(textAreaElement).toBeInTheDocument()
  });

    test("should have button 'Add Comment'", async() => {

    await render(AddCommentComponent, {
      declarations: [
        LoadingSpinnerComponent
      ],
      on: {
        commentEmitter: mockCommentEmitter
      },
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService
        }
      ]
    });

    const addCommentBtn = await screen.findByRole("button",{name: /add comment/i})
    expect(addCommentBtn).toBeInTheDocument()
  });

    test("clicking on button 'Add Comment' should invoke commentService.addComment and Output() commentEmitter", async() => {

    await render(AddCommentComponent, {
      declarations: [
        LoadingSpinnerComponent
      ],
      on: {
        commentEmitter: mockCommentEmitter
      },
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 2
              }
            }
          }
        }
      ],
    
    });

    const textAreaElement = screen.getByLabelText(/write your comment.../i);
    expect(textAreaElement).toBeInTheDocument()
    await user.type(textAreaElement,"my comment")
    const addCommentBtn = await screen.findByRole("button",{name: /add comment/i})
    expect(addCommentBtn).toBeInTheDocument()
    await user.click(addCommentBtn)
    expect(mockCommentService.addComment).toHaveBeenCalledTimes(1)
    expect(mockCommentService.addComment).toHaveBeenCalledWith(2,{content:"my comment"})
    expect(mockCommentEmitter).toHaveBeenCalledTimes(1)
    expect(mockCommentEmitter).toHaveBeenCalledWith(mockCommentResponse)
  });
});
