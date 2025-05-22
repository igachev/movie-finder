using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using movies_api.Data;
using movies_api.Models;

namespace movies_api.Helpers
{
    public class DbInitializer
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;

        public DbInitializer(
            ApplicationDBContext context,
            UserManager<AppUser> userManager
        )
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task CreateAdminUser()
        {
            var existingUser = await _userManager.FindByNameAsync("admin");
            if (existingUser == null)
            {
                var user = new AppUser
                {
                    Email = "admin@abv.bg",
                    UserName = "admin"
                };
                var createdUser = await _userManager.CreateAsync(user, "P@ssw0rd");
                if (createdUser.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user,"Admin");
                }
            }
        }
    }
}