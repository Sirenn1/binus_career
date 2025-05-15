using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using binusCareer.ClientApp.Model;

namespace binusCareer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PICController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PICController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PIC>>> GetPICs()
        {
            return await _context.PICs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PIC>> GetPIC(int id)
        {
            var pic = await _context.PICs.FindAsync(id);
            if (pic == null) return NotFound();
            return pic;
        }

        [HttpPost]
        public async Task<ActionResult<PIC>> PostPIC(PIC pic)
        {
            _context.PICs.Add(pic);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPIC), new { id = pic.Id }, pic);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPIC(int id, PIC pic)
        {
            if (id != pic.Id) return BadRequest();
            _context.Entry(pic).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePIC(int id)
        {
            var pic = await _context.PICs.FindAsync(id);
            if (pic == null) return NotFound();
            _context.PICs.Remove(pic);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
