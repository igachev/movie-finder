import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { Movie } from '../../types/MovieTypes';
import { ImageService, ImageUrl } from '../../services/image.service';
import { createMock } from '@testing-library/angular/jest-utils';
import { MovieService } from '../../services/movie.service';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserRegisterRequest, UserRegisterResponse, UserLoginRequest, UserLoginResponse } from '../../types/UserTypes';
import { render,screen } from '@testing-library/angular';
import { AddCommentComponent } from '../../components/add-comment/add-comment.component';
import { EditCommentComponent } from '../../components/edit-comment/edit-comment.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { ImgModalDirective } from '../../directives/img-modal.directive';

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
});
