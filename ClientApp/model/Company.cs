using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace binusCareer.ClientApp.Model
{
    public class Company
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string CompanyAccountUsername { get; set; }

        public string? Abbreviation { get; set; }

        [Required]
        public string CompanyAddress { get; set; }

        [Required]
        public string Country { get; set; }

        public string? Province { get; set; } 
        public string? City { get; set; }     

        [Required]
        public string PostalCode { get; set; }

        public string? BusinessType { get; set; } 

        [Required]
        [EmailAddress]
        public string CompanyEmail { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        public string? Fax { get; set; }

        public string? WebsiteAddress { get; set; }
        public string? Facebook { get; set; }
        public string? Instagram { get; set; }
        public string? LinkedIn { get; set; }
        public string? Twitter { get; set; }
        public string? Line { get; set; }

        [Required]
        public string CompanyType { get; set; } 

        public string? BippMemberType { get; set; } 

        public string? CompanyLogoPath { get; set; }
    }
}
