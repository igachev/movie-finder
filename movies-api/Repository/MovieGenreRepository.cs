using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using movies_api.Data;
using movies_api.Helpers;
using movies_api.Interfaces;
using movies_api.Models;

namespace movies_api.Repository
{
    public class MovieGenreRepository : IMovieGenreRepository
    {
        private readonly ApplicationDBContext _context;
        public MovieGenreRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<MovieGenre> AddMovieGenre(int movieId, int genreId)
        {
            await _context.MovieGenre.AddAsync(new MovieGenre { MovieId = movieId, GenreId = genreId });
            await _context.SaveChangesAsync();
            return new MovieGenre { MovieId = movieId, GenreId = genreId };
        }

        public async Task<List<Movie>> FilterMoviesByGenre(QueryObject query)
        {
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var movies = await _context.MovieGenre
            .Where((mg) => mg.Genre.GenreName.ToLower() == query.GenreName.ToLower())
            .Select((movie) => new Movie
            {
                Id = movie.Movie.Id,
                Title = movie.Movie.Title,
                Description = movie.Movie.Description,
                Genres = movie.Movie.Genres
            })
            .Skip(skipNumber)
            .Take(query.PageSize)
            .ToListAsync();
            return movies;
        }
    }
}