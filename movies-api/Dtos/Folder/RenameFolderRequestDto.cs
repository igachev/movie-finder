using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace movies_api.Dtos.Folder
{
    public class RenameFolderRequestDto
    {
        public string OldMovieTitle { get; set; } = String.Empty;
        public string NewMovieTitle { get; set; } = String.Empty;

    }
}