using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using binusCareer.ClientApp.Model;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]  // This becomes api/Auth because of the controller name
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    // This endpoint will be accessible at /api/Auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] JsonElement requestData)
    {
        if (requestData.ValueKind == JsonValueKind.Undefined)
        {
            return BadRequest("Request data is null");
        }
        
        // Extract properties directly from JSON
        if (!requestData.TryGetProperty("username", out var usernameElement) || 
            !requestData.TryGetProperty("email", out var emailElement) ||
            !requestData.TryGetProperty("password", out var passwordElement))
        {
            return BadRequest("Username, email, and password are required");
        }

        string username = usernameElement.GetString();
        string email = emailElement.GetString();
        string password = passwordElement.GetString();

        // Add validation
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            return BadRequest("Username, email, and password are required");
        }

        // Check if user already exists
        var existingUser = await _context.Users.AnyAsync(u => u.Username == username || u.Email == email);
        if (existingUser)
        {
            return Conflict("Username or email already exists");
        }

        var user = new User
        {
            Username = username,
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            IsApproved = false // New users start as not approved
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Registered successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] JsonElement requestData)
    {
        if (!requestData.TryGetProperty("username", out var usernameElement) || 
            !requestData.TryGetProperty("password", out var passwordElement))
        {
            return BadRequest("Username and password are required");
        }

        string username = usernameElement.GetString();
        string password = passwordElement.GetString();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            return Unauthorized("Invalid username or password");
        }

        if (!user.IsApproved)
        {
            return Unauthorized("User not approved by admin yet.");
        }

        return Ok(new { message = "Login success", user });
    }
}