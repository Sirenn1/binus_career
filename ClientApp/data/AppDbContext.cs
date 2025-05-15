using Microsoft.EntityFrameworkCore;

namespace binusCareer.ClientApp.Model
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<PIC> PICs { get; set; }
        public DbSet<Company> Companies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("Users")
                .Property(u => u.PasswordHash)
                .HasColumnName("password");

            modelBuilder.Entity<PIC>()
                .HasOne(p => p.Company)
                .WithMany()
                .HasForeignKey(p => p.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Company>().HasData(
                new Company
                {
                    Id = 1,
                    CompanyName = "TechNova Inc.",
                    CompanyAccountUsername = "technova_admin",
                    CompanyAddress = "123 Innovation Street",
                    PostalCode = "12345",
                    CompanyEmail = "contact@technova.com",
                    PhoneNumber = "021-1234567",
                    CompanyType = "Private",
                    Abbreviation = "TNI",
                    Country = "Indonesia",
                    Province = "DKI Jakarta",
                    City = "Jakarta",
                    BusinessType = "Software",
                    WebsiteAddress = "https://technova.com",
                    CompanyLogoPath = "/images/technova-logo.png",
                    BippMemberType = "Regular"
                }
            );

            modelBuilder.Entity<PIC>().HasData(
                new PIC
                {
                    Id = 1,
                    ContactName = "John Doe",
                    Password = "password123",
                    PhoneNumber = "021-7654321",
                    MobilePhoneNumber = "08123456789",
                    Email = "john@technova.com",
                    CompanyId = 1
                },
                new PIC
                {
                    Id = 2,
                    ContactName = "Jane Smith",
                    Password = "securepass",
                    PhoneNumber = "021-5556667",
                    MobilePhoneNumber = "08123450000",
                    Email = "jane@technova.com",
                    CompanyId = 1
                }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
