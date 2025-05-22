using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

// many to many table between Movie and Genre
namespace movies_api.Models
{
    [Table("MovieGenre")]
    public class MovieGenre
    {
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public int GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}