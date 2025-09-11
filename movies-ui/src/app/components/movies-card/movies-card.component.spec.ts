
import { MoviesCardComponent } from './movies-card.component';
import { Movie } from '../../types/MovieTypes';
import { ImageService, ImageUrl } from '../../services/image.service';
import { MovieService } from '../../services/movie.service';
import { createMock } from '@testing-library/angular/jest-utils';
import { BehaviorSubject, of } from 'rxjs';
import { render,screen } from '@testing-library/angular';
import { UserService } from '../../services/user.service';
import userEvent from '@testing-library/user-event';
import { MovieDetailsComponent } from '../../pages/movie-details/movie-details.component';
import { Router } from '@angular/router';


describe('MoviesCardComponent', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })

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

  test("should have button 'Details'",async () => {

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

  const detailsBtn = await screen.findByRole("button",{name: /details/i})
  expect(detailsBtn).toBeInTheDocument()
  })

  test("clicking on button 'Details' should invoke goToMovie() method",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: 'ivan@abv.bg',
    token: '1234',
    userName: 'ivan'
    });
  const user = userEvent.setup()

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();
  const router = {
    navigate: jest.fn()
  }

const {fixture} = await render(MoviesCardComponent,{
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
            },
            {
              provide: Router,
              useValue: router
            }
          ],
          routes: [
            {
              path: 'movies/:id/details',
              component: MovieDetailsComponent
            }
          ]
  });
  const component = fixture.componentInstance;
  const goToMovieSpy = jest.spyOn(component,"goToMovie")
  const detailsBtn = await screen.findByRole("button",{name: /details/i})
  expect(detailsBtn).toBeInTheDocument()
  await user.click(detailsBtn)
  expect(goToMovieSpy).toHaveBeenCalledTimes(1)
  expect(goToMovieSpy).toHaveBeenCalledWith(movieMock.id)
  })

  test("clicking on button 'Details' should use router.navigate and redirect user to /movies/:id/details",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: 'ivan@abv.bg',
    token: '1234',
    userName: 'ivan'
    });
  const user = userEvent.setup()

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();
  const router = {
    navigate: jest.fn()
  }

const {fixture} = await render(MoviesCardComponent,{
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
            },
            {
              provide: Router,
              useValue: router
            }
          ],
          routes: [
            {
              path: 'movies/:id/details',
              component: MovieDetailsComponent
            }
          ]
  });
  const component = fixture.componentInstance;
  const goToMovieSpy = jest.spyOn(component,"goToMovie")
  const detailsBtn = await screen.findByRole("button",{name: /details/i})
  expect(detailsBtn).toBeInTheDocument()
  await user.click(detailsBtn)
  expect(goToMovieSpy).toHaveBeenCalledTimes(1)
  expect(goToMovieSpy).toHaveBeenCalledWith(movieMock.id)
  expect(router.navigate).toHaveBeenCalledWith(["movies",movieMock.id,"details"])
  expect(router.navigate).toHaveBeenCalledTimes(1)
  })

  test("should show buttons 'Edit' and 'Delete' to admin user only",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: 'admin@abv.bg',
    token: '1234',
    userName: 'admin'
    });
  const user = userEvent.setup()

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();
  const router = {
    navigate: jest.fn()
  }

const {fixture} = await render(MoviesCardComponent,{
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
            },
            {
              provide: Router,
              useValue: router
            }
          ],
          routes: [
            {
              path: 'movies/:id/details',
              component: MovieDetailsComponent
            }
          ]
  });
  const component = fixture.componentInstance;
  const detailsBtn = await screen.findByRole("button",{name: /details/i})
  const editBtn = await screen.findByRole("button",{name: /edit/i})
  const deleteBtn = await screen.findByRole("button",{name: /delete/i})
  expect(detailsBtn).toBeInTheDocument()
  expect(editBtn).toBeInTheDocument()
  expect(deleteBtn).toBeInTheDocument()
  })

  test("should not show buttons 'Edit' and 'Delete' to ordinary logged in user",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: 'ivan@abv.bg',
    token: '1234',
    userName: 'ivan'
    });
  const user = userEvent.setup()

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();
  const router = {
    navigate: jest.fn()
  }

const {fixture} = await render(MoviesCardComponent,{
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
            },
            {
              provide: Router,
              useValue: router
            }
          ],
          routes: [
            {
              path: 'movies/:id/details',
              component: MovieDetailsComponent
            }
          ]
  });
  const component = fixture.componentInstance;
  const detailsBtn = await screen.findByRole("button",{name: /details/i})
  const editBtn = screen.queryByRole("button",{name: /edit/i})
  const deleteBtn = screen.queryByRole("button",{name: /delete/i})
  expect(detailsBtn).toBeInTheDocument()
  expect(editBtn).not.toBeInTheDocument()
  expect(deleteBtn).not.toBeInTheDocument()
  })

  test("should not show buttons 'Edit' and 'Delete' to guest user",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: '',
    token: '',
    userName: ''
    });
  const user = userEvent.setup()

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();
  const router = {
    navigate: jest.fn()
  }

const {fixture} = await render(MoviesCardComponent,{
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
            },
            {
              provide: Router,
              useValue: router
            }
          ],
          routes: [
            {
              path: 'movies/:id/details',
              component: MovieDetailsComponent
            }
          ]
  });
  const component = fixture.componentInstance;
  const detailsBtn = await screen.findByRole("button",{name: /details/i})
  const editBtn = screen.queryByRole("button",{name: /edit/i})
  const deleteBtn = screen.queryByRole("button",{name: /delete/i})
  expect(detailsBtn).toBeInTheDocument()
  expect(editBtn).not.toBeInTheDocument()
  expect(deleteBtn).not.toBeInTheDocument()
  })

  test("clicking button 'Edit' should invoke goToEditMovie method",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: 'admin@abv.bg',
    token: '1234',
    userName: 'admin'
    });
  const user = userEvent.setup()

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();
  const router = {
    navigate: jest.fn()
  }

const {fixture} = await render(MoviesCardComponent,{
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
            },
            {
              provide: Router,
              useValue: router
            }
          ],
          routes: [
            {
              path: 'movies/:id/details',
              component: MovieDetailsComponent
            }
          ]
  });
  const component = fixture.componentInstance;
  const goToEditMovieSpy = jest.spyOn(component,"goToEditMovie")
  const editBtn = await screen.findByRole("button",{name: /edit/i})
  expect(editBtn).toBeInTheDocument()
  await user.click(editBtn)
  expect(goToEditMovieSpy).toHaveBeenCalledTimes(1)
  expect(goToEditMovieSpy).toHaveBeenCalledWith(movieMock.id)
  })

  test("clicking on button 'Edit' should use router.navigate and redirect user to /movies/:id/edit",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: 'admin@abv.bg',
    token: '1234',
    userName: 'admin'
    });
  const user = userEvent.setup()

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();
  const router = {
    navigate: jest.fn()
  }

const {fixture} = await render(MoviesCardComponent,{
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
            },
            {
              provide: Router,
              useValue: router
            }
          ],
          routes: [
            {
              path: 'movies/:id/details',
              component: MovieDetailsComponent
            }
          ]
  });
  const component = fixture.componentInstance;
  const goToEditMovieSpy = jest.spyOn(component,"goToEditMovie")
  const editBtn = await screen.findByRole("button",{name: /edit/i})
  expect(editBtn).toBeInTheDocument()
  await user.click(editBtn)
  expect(goToEditMovieSpy).toHaveBeenCalledTimes(1)
  expect(goToEditMovieSpy).toHaveBeenCalledWith(movieMock.id)
  expect(router.navigate).toHaveBeenCalledTimes(1)
  expect(router.navigate).toHaveBeenCalledWith(["movies",movieMock.id,"edit"])
  })

test("clicking on button 'Delete' should invoke deleteMovie method",async () => {

   const mockUserSubject = new BehaviorSubject({
    email: 'admin@abv.bg',
    token: '1234',
    userName: 'admin'
    });
  const user = userEvent.setup()

  const movieService: MovieService = createMock(MovieService);
  const imageService: ImageService = createMock(ImageService);
  const userService = {
    $userSubjectObservable: mockUserSubject.asObservable()
  };
  const deleteMovieEmitterMock = jest.fn();
  const router = {
    navigate: jest.fn()
  }

const {fixture} = await render(MoviesCardComponent,{
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
            },
            {
              provide: Router,
              useValue: router
            }
          ],
          routes: [
            {
              path: 'movies/:id/details',
              component: MovieDetailsComponent
            }
          ]
  });
  const component = fixture.componentInstance;
  const deleteMovieSpy = jest.spyOn(component,"deleteMovie")
  const deleteBtn = await screen.findByRole("button",{name: /delete/i})
  expect(deleteBtn).toBeInTheDocument()
  await user.click(deleteBtn)
  expect(deleteMovieSpy).toHaveBeenCalledTimes(1)
  expect(deleteMovieSpy).toHaveBeenCalledWith(movieMock.id)
  
  })

  
});
