using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace movies_api.Dtos.Movie
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}