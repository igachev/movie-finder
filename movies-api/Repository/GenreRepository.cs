using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Data;
using movies_api.Interfaces;
using movies_api.Models;

namespace movies_api.Repository
{
    public class GenreRepository : IGenreRepository
    {
        private readonly ApplicationDBContext _context;
        public GenreRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Genre> AddGenre(Genre genre)
        {
            await _context.Genre.AddAsync(genre);
            await _context.SaveChangesAsync();
            return genre;
        }
    }
}