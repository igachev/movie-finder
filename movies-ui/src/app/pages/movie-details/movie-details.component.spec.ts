
import { MovieDetailsComponent } from './movie-details.component';
import { Movie } from '../../types/MovieTypes';
import { ImageService, ImageUrl } from '../../services/image.service';
import { createMock } from '@testing-library/angular/jest-utils';
import { MovieService } from '../../services/movie.service';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, of } from 'rxjs';
import { UserRegisterResponse } from '../../types/UserTypes';
import { render,screen } from '@testing-library/angular';
import { AddCommentComponent } from '../../components/add-comment/add-comment.component';
import { EditCommentComponent } from '../../components/edit-comment/edit-comment.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { ImgModalDirective } from '../../directives/img-modal.directive';
import userEvent from '@testing-library/user-event';
import { Comment } from '../../types/CommentTypes';

describe('MovieDetailsComponent', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

   const movieMock: Movie = {
        id: 1,
        title: 'Batman',
        description: 'batman description',
        comments: [
           {
            id: 13,
            content: "amazing movie.I recommend it!",
            createdOn: new Date("2025-08-23T20:10:43.6873043"),
            createdBy: "admin"
        },
        {
            id: 14,
            content: "my favourite movie!",
            createdOn: new Date("2025-08-23T20:10:59.0257388"),
            createdBy: "admin"
        },
        {
          id: 15,
          content: "epic movie!",
          createdOn: new Date("2025-08-25T21:12:39.0257388"),
          createdBy: "ivan"
        }
        ],
        genres: [
              {
                  genreName: "action"
              },
              {
                  genreName: "drama"
              },]
      };
  
    const imagesMock: ImageUrl = {
       images: [
          "http://localhost:5174/Upload/batmanbegins/davies-designs-studio-f5_lfi2S-d4-unsplash.jpg",
          "http://localhost:5174/Upload/batmanbegins/joshua-kettle-MbrDHQfskuQ-unsplash.jpg",
          "http://localhost:5174/Upload/batmanbegins/keegan-houser--Q_t4SCN8c4-unsplash.jpg"
      ]
    };

    test("should have h2 html tag with content 'Movie Details'",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      const h2Element = await screen.findByRole("heading",{level: 2, name: /Movie Details/i})
      expect(h2Element).toBeInTheDocument()
    })

    test("should show title,description,images,genres correctly",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      const movieTitle = await screen.findByText(new RegExp(`Title: ${movieMock.title}`,'i'))
      const movieDescription = await screen.findByText(new RegExp(`Description: ${movieMock.description}`,'i'))
      expect(movieTitle).toBeInTheDocument()
      expect(movieDescription).toBeInTheDocument()
      for(let i = 0; i < movieMock.genres.length; i++) {
        let genre = await screen.findByText(new RegExp(movieMock.genres[i].genreName,'i'))
        expect(genre).toBeInTheDocument()
      }
      const movieImages = await screen.findAllByRole("img")
      const uniqueSrcs = [...new Set(movieImages.map(img => img.getAttribute("src")))]
      expect(uniqueSrcs).toEqual(imagesMock.images)
    })

    test("should show movie comments",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      for(let i = 0; i < movieMock.comments.length; i++) {
        let comment = await screen.findByText(new RegExp(movieMock.comments[i].content,'i'))
        expect(comment).toBeInTheDocument()
      }
      
    })

    test("should show authors of comments",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      for(let i = 0; i < movieMock.comments.length; i++) {
        let authorOfComments = await screen.findAllByText(new RegExp(movieMock.comments[i].createdBy,'i'))
        authorOfComments.forEach((author) => {
          expect(author).toBeInTheDocument()
        })
      }
      
    })

    test("should show creation dates of comments",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      for(let i = 0; i < movieMock.comments.length; i++) {
        let date = movieMock.comments[i].createdOn;
        let formatDate = date.getFullYear() + '-' + 
        (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + 
        date.getDate() + " " +
        (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + 
        (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + 
        (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
        let commentCreatedOn = await screen.findByText(new RegExp(formatDate,'i'))
          expect(commentCreatedOn).toBeInTheDocument()
      }
      
    })

    test("guest user should not see 'Edit' buttons",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: '',
        token: '',
        userName: ''
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      const editButtons = await screen.queryAllByRole("button",{name:/edit/i})
      editButtons.forEach((editBtn) => {
        expect(editBtn).not.toBeInTheDocument()
      })
      
    })

    test("guest user should not see 'Delete' buttons",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: '',
        token: '',
        userName: ''
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      const deleteButtons = await screen.queryAllByRole("button",{name:/delete/i})
      deleteButtons.forEach((deleteBtn) => {
        expect(deleteBtn).not.toBeInTheDocument()
      })
      
    })

    test("logged-in user should see 'Edit' buttons",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      const editButtons = await screen.findAllByRole("button",{name:/edit/i})
      editButtons.forEach((editBtn) => {
        expect(editBtn).toBeInTheDocument()
      })
      
    })

    test("logged-in user should see 'Delete' buttons",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      const deleteButtons = await screen.findAllByRole("button",{name:/delete/i})
      deleteButtons.forEach((deleteBtn) => {
        expect(deleteBtn).toBeInTheDocument()
      })
      
    })

    test("guest user should not see 'Add Comment' button and textarea element for adding comments",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: '',
        token: '',
        userName: ''
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      const addCommentBtn = screen.queryByRole("button",{name:/add comment/i})
      const commentTextArea = screen.queryByRole('textbox');
      expect(addCommentBtn).not.toBeInTheDocument()
      expect(commentTextArea).not.toBeInTheDocument()
    })

    test("logged-in user should see 'Add Comment' button and textarea element for adding comments",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

      await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });

      
      const addCommentBtn = await screen.findByRole("button",{name:/add comment/i})
      const commentTextArea = screen.getByRole('textbox');
      expect(addCommentBtn).toBeInTheDocument()
      expect(commentTextArea).toBeInTheDocument()
    })

    test("logged-in user should be able to delete its own comment",async () => {
      const movieService = createMock(MovieService)
      movieService.getMovie = jest.fn((movieId: string) => {
        return of(movieMock)
      })
      const commentService = createMock(CommentService)
      commentService.deleteComment = jest.fn((commentId: number) => {
        const deletedComment = movieMock.comments.find((comment) => comment.id === commentId) as Comment;
        movieMock.comments = movieMock.comments.filter((comment) => comment.id !== commentId);
        return of(deletedComment);
      })
      const imageService = createMock(ImageService)
      imageService.getImages = jest.fn((movieTitle: string) => {
        return of(imagesMock)
      })
      const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
        email: 'ivan@abv.bg',
        token: '1234',
        userName: 'ivan'
      });
      const userService = {
        $userSubjectObservable: mockUserSubject.asObservable(),
      };

     const {fixture} = await render(MovieDetailsComponent,{
        declarations: [
          AddCommentComponent,
          EditCommentComponent,
          LoadingSpinnerComponent,
          ImgModalDirective
        ],
        providers: [
          {
            provide: MovieService,
            useValue: movieService
          },
          {
            provide: CommentService,
            useValue: commentService
          },
          {
            provide: UserService,
            useValue: userService
          },
          {
            provide: ImageService,
            useValue: imageService
          }
        ]
      });
      const commentToDelete = await screen.findByText(movieMock.comments[2].content)
      const component = fixture.componentInstance
      const deleteCommentSpy = jest.spyOn(component,"deleteComment")
      const user = userEvent.setup();
      const deleteButtons = await screen.findAllByRole("button",{name: /delete/i})
      const deleteBtn = deleteButtons[0]
      await user.click(deleteBtn)
      expect(deleteCommentSpy).toHaveBeenCalledTimes(1)
      expect(commentToDelete).not.toBeInTheDocument()
    })
});
