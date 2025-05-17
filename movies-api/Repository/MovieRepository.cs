using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using movies_api.Data;
using movies_api.Interfaces;
using movies_api.Models;

namespace movies_api.Repository
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDBContext _context;

        public MovieRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Movie> CreateMovie(Movie movie)
        {
            try
            {
                var movieExists = await _context.Movie.FirstOrDefaultAsync((m) => m.Title == movie.Title);
                if (movieExists != null)
                {
                    throw new Exception("movie already exists!");
                }
                else
                {
                    await _context.Movie.AddAsync(movie);
                    await _context.SaveChangesAsync();
                    return movie;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        public async Task<Movie?> GetMovie(int id)
        {
            try
            {
                var movie = await _context.Movie.FirstOrDefaultAsync((m) => m.Id == id);
                if (movie == null)
                {
                    throw new Exception("Movie not found");
                }
                return movie;
          }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<List<Movie>> GetMovies()
        {
            var movies = await _context.Movie.ToListAsync();
            return movies;
        }

        
    }
}