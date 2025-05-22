using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using movies_api.Models;

namespace movies_api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {

        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Movie> Movie { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<MovieGenre> MovieGenre { get; set; }

         protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // creating composite key
            builder.Entity<MovieGenre>((x) => x.HasKey(m => new { m.MovieId, m.GenreId }));

             builder.Entity<MovieGenre>()
            .HasOne(u => u.Movie)
            .WithMany(u => u.MovieGenre)
            .HasForeignKey(p => p.MovieId);

              builder.Entity<MovieGenre>()
            .HasOne(u => u.Genre)
            .WithMany(u => u.MovieGenre)
            .HasForeignKey(p => p.GenreId);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole {
                    Id = "Admin",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                 new IdentityRole {
                    Id = "User",
                    Name = "User",
                    NormalizedName = "USER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}