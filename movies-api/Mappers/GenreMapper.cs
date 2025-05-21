using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Dtos.Genre;
using movies_api.Models;

namespace movies_api.Mappers
{
    public static class GenreMapper
    {
        public static GenreDto ToGenreDto(this Genre genre)
        {
            return new GenreDto
            {
                GenreName = genre.GenreName
            };
        }
    }
}