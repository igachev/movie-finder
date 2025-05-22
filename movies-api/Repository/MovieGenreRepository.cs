using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Data;
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
    }
}