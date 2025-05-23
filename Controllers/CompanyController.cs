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
        return await _context.Companies.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Company>> GetCompany(int id)
    {
        var company = await _context.Companies.FindAsync(id);
        if (company == null) return NotFound();
        return company;
    }

    [HttpPost]
    public async Task<ActionResult<Company>> PostCompany([FromForm] Company company, IFormFile? companyLogo)
    {
        // Validate required fields
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

            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "company-logos");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await companyLogo.CopyToAsync(stream);
            }

            company.CompanyLogoPath = $"/uploads/company-logos/{uniqueFileName}";
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
            return await _context.Companies.ToListAsync();

        return await _context.Companies
            .Where(c => c.CompanyName.Contains(name))
            .ToListAsync();
    }
}
