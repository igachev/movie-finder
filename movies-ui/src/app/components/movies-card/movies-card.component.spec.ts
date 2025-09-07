import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCardComponent } from './movies-card.component';
import { Movie } from '../../types/MovieTypes';
import { ImageService, ImageUrl } from '../../services/image.service';
import { MovieService } from '../../services/movie.service';
import { createMock } from '@testing-library/angular/jest-utils';
import { BehaviorSubject } from 'rxjs';
import { render,screen } from '@testing-library/angular';
import { UserService } from '../../services/user.service';

describe('MoviesCardComponent', () => {

  const movieMock: Movie = {
      id: 1,
      title: 'Batman',
      description: 'batman description',
      comments: [],
      genres: [
            {
                genreName: "action"
            },
            {
                genreName: "drama"
            },],
            firstImg: "http://localhost:5174/Upload/batmanbegins/davies-designs-studio-f5_lfi2S-d4-unsplash.jpg"
    };

  const imagesMock: ImageUrl = {
     images: [
        "http://localhost:5174/Upload/batmanbegins/davies-designs-studio-f5_lfi2S-d4-unsplash.jpg",
        "http://localhost:5174/Upload/batmanbegins/joshua-kettle-MbrDHQfskuQ-unsplash.jpg",
        "http://localhost:5174/Upload/batmanbegins/keegan-houser--Q_t4SCN8c4-unsplash.jpg"
    ]
  };



  test("should display title,description,image,genres correctly",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: 'ivan@abv.bg',
    token: '1234',
    userName: 'ivan'
    });

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();

  await render(MoviesCardComponent,{
    inputs: {
      movie: movieMock
    },
    on: {
      deleteMovieEmitter: deleteMovieEmitterMock
    },
      componentProviders: [
            {
              provide: MovieService,
              useValue: movieService
            },
            {
              provide: ImageService,
              useValue: imageService
            },
            {
              provide: UserService,
              useValue: userService
            }
          ]
  });

  const movieTitle = await screen.findByText(new RegExp(`Title: ${movieMock.title}`,'i'))
  const movieDescription = await screen.findByText(new RegExp(`Description: ${movieMock.description}`,'i'))
  const movieImg = await screen.findByRole("img",{name: movieMock.title})
  expect(movieTitle).toBeInTheDocument()
  expect(movieDescription).toBeInTheDocument()
  expect(movieImg).toBeInTheDocument()
  expect(movieImg.getAttribute("src")).toBe(movieMock.firstImg)
  for(let i = 0; i < movieMock.genres.length; i++) {
    let genre = movieMock.genres[i].genreName;
    const movieGenre = await screen.findByText(new RegExp(`${genre}`,'i'))
    expect(movieGenre).toBeInTheDocument()
  }
 
  })
});
