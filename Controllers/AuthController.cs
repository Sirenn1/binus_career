using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using binusCareer.ClientApp.Model;

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
    public async Task<IActionResult> Register(UserDto request)
    {
        if (request == null)
        {
            return BadRequest("Request data is null");
        }

        // Add validation
        if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest("Username, email, and password are required");
        }

        // Check if user already exists
        var existingUser = await _context.Users.AnyAsync(u => u.Username == request.Username || u.Email == request.Email);
        if (existingUser)
        {
            return Conflict("Username or email already exists");
        }

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            IsApproved = false // New users start as not approved
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Registered successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
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