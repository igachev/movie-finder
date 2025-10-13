import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Movie } from '../types/MovieTypes';

describe('MovieService', () => {

  const mockMovies: Movie[] = [
    { id: 1, title: 'Batman', description: 'batman description', comments: [], genres: [{ genreName: "action" }, { genreName: "drama" }], firstImg: 'img1' },
    { id: 2, title: 'Avatar', description: 'avatar description', comments: [], genres: [{ genreName: "sci-fi" }], firstImg: 'img2' },
    { id: 3, title: 'Star Wars:Rogue One', description: 'star wars description', comments: [], genres: [{ genreName: "sci-fi" }, { genreName: "action" }], firstImg: 'img3' },
  ];

  let httpClientMock = { get: jest.fn() };
  let movieService: MovieService;

  beforeEach(() => {
     httpClientMock = { get: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        // Registers that service with the TestBed’s dependency system
        MovieService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });
    // Actually retrieves the instance so you can use it in your test
    movieService = TestBed.inject(MovieService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  test("'getMovies' method should be defined",() => {
    expect(movieService.getMovies).toBeDefined();
  })

  test("'getMovies' should return correct movies based on pagination parameters", (done) => {
    const pageNumber = 1;
    const pageSize = 2;
    let start = pageNumber - 1 * pageSize;
    let end = pageSize + start;

    // Mock the HttpClient.get call
    httpClientMock.get.mockReturnValue(of(mockMovies.slice(start,end)));
    const expectedMovies = mockMovies.slice(start,end);
    movieService.getMovies(pageNumber, pageSize).subscribe(movies => {
      expect(movies).toEqual(expectedMovies);
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
      expect(movies.length).toBe(expectedMovies.length);
      done();
    });
  });



});
