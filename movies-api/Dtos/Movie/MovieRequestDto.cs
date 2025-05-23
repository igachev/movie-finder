using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace movies_api.Dtos.Movie
{
    public class MovieRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public List<string> Genres { get; set; } = new List<string>();
        [Required]
        public string ImgUrl { get; set; } = string.Empty;
    }
}