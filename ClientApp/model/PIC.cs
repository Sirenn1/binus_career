using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace binusCareer.ClientApp.Model
{
    public class PIC
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ContactName { get; set; }

        public string? ManageIn { get; set; } 

        public string? PositionLevel { get; set; } 

        public string? JobPosition { get; set; } 

        public string? JobTitle { get; set; } 

        public string? Salutation { get; set; } 

        [Required]
        public string PhoneNumber { get; set; }

        public string? OfficeExt { get; set; }

        [Required]
        public string MobilePhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string? Whatsapp { get; set; }

        public string? Line { get; set; }

        public string? LinkedIn { get; set; }

        public string? Instagram { get; set; }

        public string? NameCardPath { get; set; } 
        [Required]
        public string Password { get; set; }

        public int CompanyId { get; set; }

        public Company? Company { get; set; }

        // Email verification fields
        public bool IsEmailVerified { get; set; } = false;
        public string? VerificationToken { get; set; }
        public DateTime? VerificationTokenExpiry { get; set; }
    }
}