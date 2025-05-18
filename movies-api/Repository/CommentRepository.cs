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
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Comment> AddComment(Comment comment)
        {
            try
            {
                var movie = await _context.Movie.FirstOrDefaultAsync((m) => m.Id == comment.MovieId);
                if (movie == null)
                {
                    throw new Exception("Movie does not exist");
                }
                else
                {
                    await _context.Comment.AddAsync(comment);
                    await _context.SaveChangesAsync();
                    return comment;
            }
           }
            catch (Exception e)
            {
                throw;
            }
        }
    }
}