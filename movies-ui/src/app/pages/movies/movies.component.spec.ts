// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { MoviesComponent } from './movies.component';
import { Movie } from '../../types/MovieTypes';
import { MovieService } from '../../services/movie.service';
import { createMock } from '@testing-library/angular/jest-utils';
import { BehaviorSubject, delay, of } from 'rxjs';
import { ImageService, ImageUrl } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { LoadingService } from '../../services/loading.service';

describe('MoviesComponent', () => {

     const mockImages:ImageUrl = {
      images: ['img1','img2','img3']
    };
    const mockMovies: Movie[] = [
      {
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
      firstImg: 'http://localhost:5174/Upload/batmanbegins/davies-designs-studio-f5_lfi2S-d4-unsplash.jpg'
    },
       {
      id: 2,
      title: 'Avatar',
      description: 'avatar description',
      comments: [],
      genres: [
            {
                genreName: "sci-fi"
            },
            ],
      firstImg: 'http://localhost:5174/Upload/avatar/another-image.jpg'
    },
        {
      id: 3,
      title: 'Star Wars:Rogue One',
      description: 'star wars description',
      comments: [],
      genres: [
            {
                genreName: "sci-fi"
            },
            {
                genreName: "action"
            },
            ],
      firstImg: 'http://localhost:5174/Upload/starwars/third-image.jpg'
    }
  ];
   
  const mockUserSubject = new BehaviorSubject({
  email: 'ivan@abv.bg',
  token: '1234',
  userName: 'ivan'
  });

  test("should have h2 html tag with content Movies Page", async() => {
 
    const movieService = createMock(MovieService);
    const imageService = createMock(ImageService);
    const userService = {
      $userSubjectObservable: mockUserSubject.asObservable()
    };

    movieService.getMovies = jest.fn(() => of(mockMovies));
    imageService.getImages = jest.fn(() => of(mockImages));


    await render(MoviesComponent,{
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

    const h1Element = await screen.findByRole('heading',{level:2,name: /movies page/i})
    expect(h1Element).toBeInTheDocument();
  })

  test("should display the first 2 movies when pageNumber=1 and pageSize=2", async() => {
 
    const movieService = createMock(MovieService);
    const imageService = createMock(ImageService);
    const userService = {
      $userSubjectObservable: mockUserSubject.asObservable()
    };

    movieService.getMovies = jest.fn((pageNumber: number, pageSize: number) => {
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      return of(mockMovies.slice(start, end));
      });
    imageService.getImages = jest.fn(() => of(mockImages));


      const {fixture} = await render(MoviesComponent,{
        declarations:[LoadingSpinnerComponent],
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
     const component = fixture.componentInstance;
     (component as any).pageNumber = 1;
     (component as any).pageSize = 2;       
    const firstMovieTitle = await screen.findByText(new RegExp(`Title: ` + mockMovies[0].title,'i'))
    const secondMovieTitle = await screen.findByText(new RegExp(`Title: ` + mockMovies[1].title,'i'))
    expect(movieService.getMovies).toHaveBeenCalledWith((component as any).pageNumber,(component as any).pageSize)
    expect(firstMovieTitle).toBeInTheDocument()
    expect(secondMovieTitle).toBeInTheDocument()
  })

   test("should not display 3rd movie when pageNumber=1 and pageSize=2", async() => {

    const movieService = createMock(MovieService);
    const imageService = createMock(ImageService);
    const userService = {
      $userSubjectObservable: mockUserSubject.asObservable()
    };

    movieService.getMovies = jest.fn((pageNumber: number, pageSize: number) => {
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      return of(mockMovies.slice(start, end));
      });
    imageService.getImages = jest.fn(() => of(mockImages));


      const {fixture} = await render(MoviesComponent,{
        declarations:[LoadingSpinnerComponent],
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
     const component = fixture.componentInstance;
     (component as any).pageNumber = 1;
     (component as any).pageSize = 2;       
    const firstMovieTitle = await screen.findByText(new RegExp(`Title: ` + mockMovies[0].title,'i'))
    const secondMovieTitle = await screen.findByText(new RegExp(`Title: ` + mockMovies[1].title,'i'))
    const thirdMovieTitle = screen.queryByText(new RegExp(`Title: ` + mockMovies[2].title,'i'))
    expect(movieService.getMovies).toHaveBeenCalledWith((component as any).pageNumber,(component as any).pageSize)
    expect(firstMovieTitle).toBeInTheDocument()
    expect(secondMovieTitle).toBeInTheDocument()
    expect(thirdMovieTitle).not.toBeInTheDocument()
  })

  test("should display the loading spinner when the user makes request for the movies", async() => {
 
    const movieService = createMock(MovieService);
    const imageService = createMock(ImageService);
    const mockLoadingSubject = new BehaviorSubject(true)
    const loadingService = {
        $loadingSpinner: mockLoadingSubject.asObservable()
      }
    const userService = {
      $userSubjectObservable: mockUserSubject.asObservable()
    };

    movieService.getMovies = jest.fn((pageNumber: number, pageSize: number) => {
        const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      return of(mockMovies.slice(start, end));
      });
     
    imageService.getImages = jest.fn(() => of(mockImages));

      const {fixture} = await render(MoviesComponent,{
        declarations:[LoadingSpinnerComponent],
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
          provide: LoadingService,
          useValue: loadingService
        }
      ]
    });
    
    screen.debug()
    const loadingSpinner = await screen.findByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument(); 
    
  })

});
