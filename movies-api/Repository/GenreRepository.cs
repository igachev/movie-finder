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

        public async Task<int> GetGenreId(Genre genre)
        {
            var genreExist = await _context.Genre.FirstOrDefaultAsync((g) => g.GenreName == genre.GenreName);
            return genreExist.Id;
        }

        public async Task<bool> IsGenreExist(Genre genre)
        {
            var genreExist = await _context.Genre.FirstOrDefaultAsync((g) => g.GenreName == genre.GenreName);
            if (genreExist != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}