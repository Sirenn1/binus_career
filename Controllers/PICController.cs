using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using binusCareer.ClientApp.Model;
using System.ComponentModel.DataAnnotations;
using BCrypt.Net;
using System.Text.RegularExpressions;
using binusCareer.Services;

namespace binusCareer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PICController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IEmailService _emailService;

        public PICController(AppDbContext context, IWebHostEnvironment environment, IEmailService emailService)
        {
            _context = context;
            _environment = environment;
            _emailService = emailService;
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

        private string GenerateVerificationToken()
        {
            return Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Replace("/", "_").Replace("+", "-").TrimEnd('=');
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

            pic.VerificationToken = GenerateVerificationToken();
            pic.VerificationTokenExpiry = DateTime.UtcNow.AddHours(24); 
            pic.IsEmailVerified = false;
            pic.Password = BCrypt.Net.BCrypt.HashPassword(pic.Password);

            _context.PICs.Add(pic);
            await _context.SaveChangesAsync();

            Console.WriteLine($"\n[DEBUG] Starting email verification process...");
            Console.WriteLine($"[DEBUG] PIC Details:");
            Console.WriteLine($"[DEBUG] - Name: {pic.ContactName}");
            Console.WriteLine($"[DEBUG] - Email: {pic.Email}");
            Console.WriteLine($"[DEBUG] - Company ID: {pic.CompanyId}");

            // Send verification email to company's email
            var verificationLink = $"{Request.Scheme}://{Request.Host}/api/PIC/verify-email?token={pic.VerificationToken}";
            Console.WriteLine($"[DEBUG] Verification Link: {verificationLink}");
            Console.WriteLine($"[DEBUG] Sending verification email to company: {company.CompanyEmail}");

            var emailBody = $@"
                <h1>PIC Verification Request - Binus Career</h1>
                <p>A Person-in-Charge (PIC) has registered with your company details:</p>
                <div style='background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;'>
                    <p><strong>Name:</strong> {pic.ContactName}</p>
                    <p><strong>Position:</strong> {pic.JobPosition ?? "Not specified"}</p>
                    <p><strong>Email:</strong> {pic.Email}</p>
                    <p><strong>Phone:</strong> {pic.PhoneNumber}</p>
                    <p><strong>Mobile:</strong> {pic.MobilePhoneNumber}</p>
                </div>
                <p>Please verify if this person is authorized to act as a PIC for your company.</p>
                <p>If you confirm this person's association with your company, please click the button below:</p>
                <a href='{verificationLink}' style='display: inline-block; padding: 10px 20px; background-color: #028ed5; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;'>Confirm PIC Association</a>
                <p style='color: #666;'><small>This verification link will expire in 24 hours.</small></p>
                <p style='color: #666;'><small>If you did not expect this registration or if this person is not associated with your company, please ignore this email and the registration will not be approved.</small></p>
                <hr style='border: 1px solid #eee; margin: 20px 0;'>
                <p style='color: #666; font-size: 12px;'>This is an automated message from Binus Career. Please do not reply to this email.</p>";

            try 
            {
                await _emailService.SendEmailAsync(company.CompanyEmail, "PIC Registration Verification - Binus Career", emailBody);
                Console.WriteLine("[DEBUG] Verification email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[DEBUG] Error sending verification email: {ex.Message}");
                Console.WriteLine($"[DEBUG] Stack trace: {ex.StackTrace}");
                throw; // Re-throw to maintain the original error handling
            }

            return CreatedAtAction(nameof(GetPIC), new { id = pic.Id }, pic);
        }

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string token)
        {
            Console.WriteLine($"\n[DEBUG] Processing email verification...");
            Console.WriteLine($"[DEBUG] Token: {token}");

            var pic = await _context.PICs
                .Include(p => p.Company)
                .FirstOrDefaultAsync(p => p.VerificationToken == token);
            
            if (pic == null)
            {
                Console.WriteLine("[DEBUG] Invalid verification token");
                return BadRequest("Invalid verification token");
            }

            Console.WriteLine($"[DEBUG] Found PIC: {pic.ContactName}");
            Console.WriteLine($"[DEBUG] Company: {pic.Company?.CompanyName}");

            if (pic.VerificationTokenExpiry < DateTime.UtcNow)
            {
                Console.WriteLine("[DEBUG] Token has expired");
                return BadRequest("Verification token has expired");
            }

            if (pic.IsEmailVerified)
            {
                Console.WriteLine("[DEBUG] PIC is already verified");
                return BadRequest("PIC is already verified");
            }

            pic.IsEmailVerified = true;
            pic.VerificationToken = null;
            pic.VerificationTokenExpiry = null;

            await _context.SaveChangesAsync();
            Console.WriteLine("[DEBUG] PIC verification status updated in database");

            // Send confirmation email to PIC
            var confirmationEmailBody = $@"
                <h1>Welcome to Binus Career!</h1>
                <p>Your registration as a PIC for {pic.Company.CompanyName} has been verified and approved.</p>
                <p>You can now log in to your account and start using Binus Career services.</p>
                <p>If you have any questions, please contact our support team.</p>";

            try 
            {
                Console.WriteLine($"[DEBUG] Sending confirmation email to PIC: {pic.Email}");
                await _emailService.SendEmailAsync(pic.Email, "PIC Registration Approved - Binus Career", confirmationEmailBody);
                Console.WriteLine("[DEBUG] Confirmation email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[DEBUG] Error sending confirmation email: {ex.Message}");
                Console.WriteLine($"[DEBUG] Stack trace: {ex.StackTrace}");
                throw;
            }

            return Ok(new { message = "PIC verified successfully" });
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