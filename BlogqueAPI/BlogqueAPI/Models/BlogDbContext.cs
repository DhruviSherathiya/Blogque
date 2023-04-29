using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BlogqueAPI.Models
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options)
        {

        }

        public DbSet<BlogPost> BlogPosts { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BlogPost>()
                .HasOne(p => p.Author)
                .WithMany(u => u.BlogPosts)
                .HasForeignKey(p => p.AuthorId);
        }

    }
}
