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

        public async Task<List<Movie>> GetMovies()
        {
            var movies = await _context.Movie.ToListAsync();
            return movies;
        }

        
    }
}