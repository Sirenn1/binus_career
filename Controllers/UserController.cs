using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using binusCareer.ClientApp.Model;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    [HttpPut("{id}/approve")]
    public async Task<IActionResult> ApproveUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        user.IsApproved = true;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}/reject")]
    public async Task<IActionResult> RejectUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
