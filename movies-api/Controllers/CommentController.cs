using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using movies_api.Dtos.Comment;
using movies_api.Extensions;
using movies_api.Interfaces;
using movies_api.Mappers;
using movies_api.Models;

namespace movies_api.Controllers
{
    [Route("comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly UserManager<AppUser> _userManager;
        public CommentController(
            ICommentRepository commentRepo,
            UserManager<AppUser> userManager
            )
        {
            _commentRepo = commentRepo;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("{commentId}")]
        public async Task<IActionResult> GetComment([FromRoute] int commentId)
        {
            try
            {
                var comment = await _commentRepo.GetComment(commentId);
                return Ok(comment.ToCommentDto());
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        [Route("{movieId:int}")]
        [Authorize]
        public async Task<IActionResult> AddComment(
            [FromRoute] int movieId,
            [FromBody] CommentRequestDto commentRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this code shows our validation errors as response
            }
            try
            {
                var username = User.GetUsername();
                var loggedInUser = await _userManager.FindByNameAsync(username);
                
                var comment = commentRequestDto.ToComment(movieId);
                // using the one to one relationship between comment and AppUser
                comment.AppUserId = loggedInUser.Id;
                var addedComment = await _commentRepo.AddComment(comment);
                return CreatedAtAction(nameof(GetComment), new { commentId = addedComment.Id }, addedComment.ToCommentDto());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

      

        [HttpPut]
        [Route("movie/{movieId:int}/comment/{commentId:int}")]
        public async Task<IActionResult> EditComment(
            [FromRoute] int movieId,
            [FromRoute] int commentId,
            [FromBody] CommentRequestDto commentRequestDto
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this code shows our validation errors as response
            }
            try
            {
                var comment = commentRequestDto.ToComment(movieId);
                var editedComment = await _commentRepo.EditComment(commentId, comment);
                return Ok(editedComment.ToCommentDto());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("{commentId:int}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int commentId)
        {
            try
            {
                var deletedComment = await _commentRepo.DeleteComment(commentId);
                return Ok(deletedComment.ToCommentDto());   
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}