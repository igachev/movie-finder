using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace movies_api.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;

        public ImageController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [NonAction]
        private string GetFilePath(string movieTitle)
        {
            return _environment.WebRootPath + "\\Upload\\" + movieTitle;
        }

        [HttpPut]
        [Route("upload")]
        public async Task<IActionResult> UploadImages(
            IFormFileCollection fileCollection,
            [FromQuery] string movieTitle
        )
        {
            try
            {
                var filePath = GetFilePath(movieTitle);
                if (!System.IO.Directory.Exists(filePath))
                {
                    System.IO.Directory.CreateDirectory(filePath);
                }
                foreach (var file in fileCollection)
                {
                    string imagePath = filePath + "\\" + file.FileName;
                    /*
"Open a file for writing. Copy the uploaded file’s content into it. 
Then automatically close the file, no matter what happens."
                    */
                    using (FileStream fs = System.IO.File.Create(imagePath))
                    {
                        await file.CopyToAsync(fs);
                    }
                }
                return Ok("Images uploaded successfully");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}