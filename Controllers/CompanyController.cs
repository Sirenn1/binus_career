using Microsoft.AspNetCore.Mvc;
using binusCareer.ClientApp.Model;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public CompanyController(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
    {
        var companies = await _context.Companies.ToListAsync();
        foreach (var company in companies)
        {
            Console.WriteLine($"Company {company.Id} - {company.CompanyName}:");
            Console.WriteLine($"  Logo Path: '{company.CompanyLogoPath}'");
            Console.WriteLine($"  Logo Path Type: {company.CompanyLogoPath?.GetType()}");
            Console.WriteLine($"  Logo Path Length: {company.CompanyLogoPath?.Length ?? 0}");
        }
        return companies;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Company>> GetCompany(int id)
    {
        var company = await _context.Companies.FindAsync(id);
        if (company == null) return NotFound();
        Console.WriteLine($"Company {company.Id} - {company.CompanyName}:");
        Console.WriteLine($"  Logo Path: '{company.CompanyLogoPath}'");
        Console.WriteLine($"  Logo Path Type: {company.CompanyLogoPath?.GetType()}");
        Console.WriteLine($"  Logo Path Length: {company.CompanyLogoPath?.Length ?? 0}");
        return company;
    }

    [HttpPost]
    public async Task<ActionResult<Company>> PostCompany([FromForm] Company company, IFormFile? companyLogo)
    {
        if (string.IsNullOrEmpty(company.CompanyName))
            return BadRequest("Company name is required");
        if (string.IsNullOrEmpty(company.CompanyAccountUsername))
            return BadRequest("Company account username is required");
        if (string.IsNullOrEmpty(company.CompanyEmail))
            return BadRequest("Company email is required");
        if (!new EmailAddressAttribute().IsValid(company.CompanyEmail))
            return BadRequest("Invalid email format");
        if (string.IsNullOrEmpty(company.PhoneNumber))
            return BadRequest("Phone number is required");
        if (string.IsNullOrEmpty(company.CompanyAddress))
            return BadRequest("Company address is required");
        if (string.IsNullOrEmpty(company.Country))
            return BadRequest("Country is required");
        if (string.IsNullOrEmpty(company.Province))
            return BadRequest("Province is required");
        if (string.IsNullOrEmpty(company.City))
            return BadRequest("City is required");
        if (string.IsNullOrEmpty(company.PostalCode))
            return BadRequest("Postal code is required");

        var existingCompany = await _context.Companies
            .FirstOrDefaultAsync(c => c.CompanyAccountUsername == company.CompanyAccountUsername);
        if (existingCompany != null)
            return BadRequest("Company account username already exists");

        if (companyLogo != null)
        {
            if (companyLogo.Length > 2 * 1024 * 1024) 
                return BadRequest("Company logo size should not exceed 2MB");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(companyLogo.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(extension))
                return BadRequest("Only .jpg, .jpeg, and .png files are allowed");

            if (string.IsNullOrEmpty(_environment.WebRootPath))
            {
                return BadRequest("WebRootPath is not configured properly");
            }

            try
            {
                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "company-logos");
                Console.WriteLine($"Upload folder path: {uploadsFolder}");
                
                if (!Directory.Exists(uploadsFolder))
                {
                    Console.WriteLine($"Creating directory: {uploadsFolder}");
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                Console.WriteLine($"File path: {filePath}");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await companyLogo.CopyToAsync(stream);
                }

                company.CompanyLogoPath = $"/uploads/company-logos/{uniqueFileName}";
                Console.WriteLine($"Company logo path: {company.CompanyLogoPath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving file: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return BadRequest($"Error saving file: {ex.Message}");
            }
        }

        _context.Companies.Add(company);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutCompany(int id, Company company)
    {
        if (id != company.Id) return BadRequest();
        
        var existingCompany = await _context.Companies.FindAsync(id);
        if (existingCompany == null) return NotFound();

        if (string.IsNullOrEmpty(company.CompanyName))
            return BadRequest("Company name is required");
        if (string.IsNullOrEmpty(company.CompanyEmail))
            return BadRequest("Company email is required");
        if (!new EmailAddressAttribute().IsValid(company.CompanyEmail))
            return BadRequest("Invalid email format");
        if (string.IsNullOrEmpty(company.PhoneNumber))
            return BadRequest("Phone number is required");
        if (string.IsNullOrEmpty(company.CompanyAddress))
            return BadRequest("Company address is required");

        _context.Entry(existingCompany).CurrentValues.SetValues(company);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompany(int id)
    {
        var company = await _context.Companies.FindAsync(id);
        if (company == null) return NotFound();

        // Delete company logo if exists
        if (!string.IsNullOrEmpty(company.CompanyLogoPath))
        {
            var filePath = Path.Combine(_environment.WebRootPath, company.CompanyLogoPath.TrimStart('/'));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }

        _context.Companies.Remove(company);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Company>>> SearchCompanies([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            var companies = await _context.Companies.ToListAsync();
            foreach (var company in companies)
            {
                Console.WriteLine($"Company {company.Id} - {company.CompanyName}:");
                Console.WriteLine($"  Logo Path: '{company.CompanyLogoPath}'");
                Console.WriteLine($"  Logo Path Type: {company.CompanyLogoPath?.GetType()}");
                Console.WriteLine($"  Logo Path Length: {company.CompanyLogoPath?.Length ?? 0}");
            }
            return companies;
        }

        var filteredCompanies = await _context.Companies
            .Where(c => c.CompanyName.Contains(name))
            .ToListAsync();
        foreach (var company in filteredCompanies)
        {
            Console.WriteLine($"Filtered Company {company.Id} - {company.CompanyName}:");
            Console.WriteLine($"  Logo Path: '{company.CompanyLogoPath}'");
            Console.WriteLine($"  Logo Path Type: {company.CompanyLogoPath?.GetType()}");
            Console.WriteLine($"  Logo Path Length: {company.CompanyLogoPath?.Length ?? 0}");
        }
        return filteredCompanies;
    }
}
