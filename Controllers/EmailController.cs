using Microsoft.AspNetCore.Mvc;
using binusCareer.Services;
using Microsoft.AspNetCore.Cors;

namespace binusCareer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email))
                {
                    return BadRequest(new { message = "Email is required" });
                }

                await _emailService.SendEmailAsync(
                    request.Email,
                    "Welcome to Binus Career!",
                    "<h1>Welcome to Binus Career!</h1><p>Thank you for subscribing to our newsletter.</p>"
                );
                return Ok(new { message = "Email sent successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Failed to send email", error = ex.Message });
            }
        }
    }

    public class EmailRequest
    {
        public string Email { get; set; } = string.Empty;
    }
} 