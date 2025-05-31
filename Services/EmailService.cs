using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;

namespace binusCareer.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            Console.WriteLine($"\n[DEBUG] Preparing to send email...");
            Console.WriteLine($"[DEBUG] To: {to}");
            Console.WriteLine($"[DEBUG] Subject: {subject}");

            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("heinrichsitorus@gmail.com"));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;

            var builder = new BodyBuilder
            {
                HtmlBody = body
            };
            email.Body = builder.ToMessageBody();

            try
            {
                Console.WriteLine("[DEBUG] Connecting to SMTP server (smtp.gmail.com)...");
                using var smtp = new SmtpClient();
                await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                
                Console.WriteLine("[DEBUG] Authenticating with SMTP server...");
                await smtp.AuthenticateAsync("heinrichsitorus@gmail.com", "aqcq pded lceq lovv");
                
                Console.WriteLine("[DEBUG] Sending email...");
                await smtp.SendAsync(email);
                Console.WriteLine("[DEBUG] Email sent successfully!");
                
                await smtp.DisconnectAsync(true);
                Console.WriteLine("[DEBUG] Disconnected from SMTP server");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[DEBUG] Error sending email: {ex.Message}");
                Console.WriteLine($"[DEBUG] Stack trace: {ex.StackTrace}");
                throw;
            }
        }
    }
} 