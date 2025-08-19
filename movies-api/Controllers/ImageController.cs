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
                string movieWithoutSpaces = movieTitle.Replace(" ", string.Empty).ToLower();
                var filePath = GetFilePath(movieWithoutSpaces);
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
                return Ok(new {message = "Images uploaded successfully"});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetImages([FromQuery] string movieTitle)
        {
            try
            {
                string movieWithoutSpaces = movieTitle.Replace(" ", string.Empty).ToLower();
                string filePath = GetFilePath(movieWithoutSpaces);
                List<string> imageUrls = new List<string>();
                string hostUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
                if (System.IO.Directory.Exists(filePath))
                {
                    DirectoryInfo directoryInfo = new DirectoryInfo(filePath);
                    FileInfo[] fileInfos = directoryInfo.GetFiles();
                    foreach (FileInfo fileInfo in fileInfos)
                    {
                        string fileName = fileInfo.Name;
                        string imagePath = filePath + "\\" + fileName;
                        if (System.IO.File.Exists(imagePath))
                        {
                            string imageUrl = hostUrl + "/Upload/" + movieWithoutSpaces + "/" + fileName;
                            imageUrls.Add(imageUrl);
                        }
                    }
                }
                return Ok(new { images = imageUrls });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("remove-all")]
        public async Task<IActionResult> RemoveImagesForMovie([FromQuery] string movieTitle)
        {
            try
            {
                string movieWithoutSpaces = movieTitle.Replace(" ", string.Empty).ToLower();
                string filePath = GetFilePath(movieWithoutSpaces);
                if (System.IO.Directory.Exists(filePath))
                {
                    DirectoryInfo directoryInfo = new DirectoryInfo(filePath);
                    // get all images from that directory
                    FileInfo[] fileInfos = directoryInfo.GetFiles();
                    foreach (FileInfo fileInfo in fileInfos)
                    {
                        fileInfo.Delete();
                    }
                    System.IO.Directory.Delete(filePath);
                    return Ok(new { message = "Images deleted" });
                }
                else
                {
                    return NotFound(new { message = "Images not found.No such directory." });
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}