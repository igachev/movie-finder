using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Models;

namespace movies_api.Interfaces
{
    public interface IGenreRepository
    {
        Task<Genre> AddGenre(Genre genre);
        Task<bool> IsGenreExist(Genre genre);
        Task<int> GetGenreId(Genre genre);
    }
}