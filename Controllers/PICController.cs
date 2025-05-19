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
        public async Task<ActionResult<PIC>> PostPIC(PICDto picDto)
        {
            var pic = new PIC
            {
                ContactName = picDto.ContactName,
                Email = picDto.Email,
                PhoneNumber = picDto.PhoneNumber,
                MobilePhoneNumber = picDto.MobilePhoneNumber,
                ManageIn = picDto.ManageIn,
                PositionLevel = picDto.PositionLevel,
                JobPosition = picDto.JobPosition,
                JobTitle = picDto.JobTitle,
                Salutation = picDto.Salutation,
                OfficeExt = picDto.OfficeExt,
                Whatsapp = picDto.Whatsapp,
                Line = picDto.Line,
                LinkedIn = picDto.LinkedIn,
                Instagram = picDto.Instagram,
                Password = BCrypt.Net.BCrypt.HashPassword(picDto.Password),
                CompanyId = picDto.CompanyId
            };

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
