using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using binusCareer.ClientApp.Model;
using System.ComponentModel.DataAnnotations;
using BCrypt.Net;
using System.Text.RegularExpressions;

namespace binusCareer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PICController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public PICController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        private bool IsValidPhoneNumber(string phoneNumber)
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
                return false;

            return Regex.IsMatch(phoneNumber, @"^[\d\s\-\(\)\+]+$");
        }

        private bool IsValidMobilePhoneNumber(string mobilePhoneNumber)
        {
            if (string.IsNullOrWhiteSpace(mobilePhoneNumber))
                return false;

            return Regex.IsMatch(mobilePhoneNumber, @"^[\d\s\-\(\)\+]+$");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PIC>>> GetPICs()
        {
            return await _context.PICs.Include(p => p.Company).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PIC>> GetPIC(int id)
        {
            var pic = await _context.PICs.Include(p => p.Company).FirstOrDefaultAsync(p => p.Id == id);
            if (pic == null) return NotFound();
            return pic;
        }

        [HttpPost]
        public async Task<ActionResult<PIC>> PostPIC([FromForm] PIC pic, IFormFile? nameCard)
        {
            if (string.IsNullOrEmpty(pic.ContactName))
                return BadRequest("Contact name is required");
            if (string.IsNullOrEmpty(pic.Email))
                return BadRequest("Email is required");
            if (!new EmailAddressAttribute().IsValid(pic.Email))
                return BadRequest("Invalid email format");
            if (string.IsNullOrEmpty(pic.PhoneNumber))
                return BadRequest("Phone number is required");
            if (!IsValidPhoneNumber(pic.PhoneNumber))
                return BadRequest("Invalid phone number format. Please use numeric characters only");
            if (string.IsNullOrEmpty(pic.MobilePhoneNumber))
                return BadRequest("Mobile phone number is required");
            if (!IsValidMobilePhoneNumber(pic.MobilePhoneNumber))
                return BadRequest("Invalid mobile phone number format. Please use numeric characters only");
            if (string.IsNullOrEmpty(pic.Password))
                return BadRequest("Password is required");
            if (pic.Password.Length < 8)
                return BadRequest("Password must be at least 8 characters long");

            var existingPIC = await _context.PICs.FirstOrDefaultAsync(p => p.Email == pic.Email);
            if (existingPIC != null)
                return BadRequest("Email already registered");

            var company = await _context.Companies.FindAsync(pic.CompanyId);
            if (company == null)
                return BadRequest("Company not found");

            if (nameCard != null)
            {
                if (nameCard.Length > 2 * 1024 * 1024) // 2MB limit
                    return BadRequest("Name card size should not exceed 2MB");

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".pdf" };
                var extension = Path.GetExtension(nameCard.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Only .jpg, .jpeg, .png, and .pdf files are allowed");

                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "name-cards");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await nameCard.CopyToAsync(stream);
                }

                pic.NameCardPath = $"/uploads/name-cards/{uniqueFileName}";
            }

            pic.Password = BCrypt.Net.BCrypt.HashPassword(pic.Password);

            _context.PICs.Add(pic);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPIC), new { id = pic.Id }, pic);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPIC(int id, PIC pic)
        {
            if (id != pic.Id) return BadRequest();

            var existingPIC = await _context.PICs.FindAsync(id);
            if (existingPIC == null) return NotFound();

            if (string.IsNullOrEmpty(pic.ContactName))
                return BadRequest("Contact name is required");
            if (string.IsNullOrEmpty(pic.Email))
                return BadRequest("Email is required");
            if (!new EmailAddressAttribute().IsValid(pic.Email))
                return BadRequest("Invalid email format");
            if (string.IsNullOrEmpty(pic.PhoneNumber))
                return BadRequest("Phone number is required");
            if (!IsValidPhoneNumber(pic.PhoneNumber))
                return BadRequest("Invalid phone number format. Please use numeric characters only");
            if (string.IsNullOrEmpty(pic.MobilePhoneNumber))
                return BadRequest("Mobile phone number is required");
            if (!IsValidMobilePhoneNumber(pic.MobilePhoneNumber))
                return BadRequest("Invalid mobile phone number format. Please use numeric characters only");

            if (pic.Email != existingPIC.Email)
            {
                var emailExists = await _context.PICs.AnyAsync(p => p.Email == pic.Email);
                if (emailExists)
                    return BadRequest("Email already registered");
            }

            if (!string.IsNullOrEmpty(pic.Password) && pic.Password != existingPIC.Password)
            {
                if (pic.Password.Length < 8)
                    return BadRequest("Password must be at least 8 characters long");
                pic.Password = BCrypt.Net.BCrypt.HashPassword(pic.Password);
            }
            else
            {
                pic.Password = existingPIC.Password;
            }

            _context.Entry(existingPIC).CurrentValues.SetValues(pic);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePIC(int id)
        {
            var pic = await _context.PICs.FindAsync(id);
            if (pic == null) return NotFound();

            // Delete name card if exists
            if (!string.IsNullOrEmpty(pic.NameCardPath))
            {
                var filePath = Path.Combine(_environment.WebRootPath, pic.NameCardPath.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _context.PICs.Remove(pic);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class PICDto
    {
        public string ContactName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string MobilePhoneNumber { get; set; }
        public string Password { get; set; }
        public string ManageIn { get; set; }
        public string PositionLevel { get; set; }
        public string JobPosition { get; set; }
        public string JobTitle { get; set; }
        public string Salutation { get; set; }
        public string OfficeExt { get; set; }
        public string Whatsapp { get; set; }
        public string Line { get; set; }
        public string LinkedIn { get; set; }
        public string Instagram { get; set; }
        public int CompanyId { get; set; }
    }
}