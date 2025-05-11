using Microsoft.EntityFrameworkCore;

namespace binusCareer.ClientApp.Model
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("Users")
                .Property(u => u.PasswordHash)
                .HasColumnName("password");
        }
    }
}
