namespace RecipeRealm.Server.Services.Identity
{

	using RecipeRealm.Server.Model;
	using RecipeRealm.Server.Infrastructure;
	using RecipeRealm.Server.Services.Interfaces;

	using MimeKit;
	using MailKit.Net.Smtp;
	using Microsoft.Extensions.Options;
	using Azure.Identity;
	using RecipeRealm.Server.Data;
	using Microsoft.EntityFrameworkCore;
	using NSubstitute.Routing.Handlers;
	using RecipeRealm.Server.Data.Models.Identity;

	public class MailService : IMailService
	{
		private readonly MailSettings _mailSettings;
		private readonly RecipeRealmServerContext dbContext;

		public MailService(
			IOptions<MailSettings> mailSettingsOptions,
			RecipeRealmServerContext dbContext)
		{
			_mailSettings = mailSettingsOptions.Value;
			this.dbContext = dbContext;
		}

		public async Task<bool> SendMailWithRestoreTokenAsync(string emailToSend)
		{
			var user = GetUser(emailToSend);
			user.passwor
			try
			{
				var mailData = GetMailDataWithRestoreToken(user);
				using var emailMessage = new MimeMessage();
				var emailFrom = new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail);
				emailMessage.From.Add(emailFrom);
				var emailTo = new MailboxAddress(mailData.EmailToName, mailData.EmailToId);
				emailMessage.To.Add(emailTo);

				//emailMessage.Cc.Add(new MailboxAddress("Cc Receiver", "cc@example.com"));
				//emailMessage.Bcc.Add(new MailboxAddress("Bcc Receiver", "bcc@example.com"));

				emailMessage.Subject = mailData.EmailSubject;

				var emailBodyBuilder = new BodyBuilder
				{
					TextBody = mailData.EmailBody
				};

				emailMessage.Body = emailBodyBuilder.ToMessageBody();
				using var mailClient = new SmtpClient();
				await mailClient.ConnectAsync(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
				await mailClient.AuthenticateAsync(_mailSettings.UserName, _mailSettings.Password);
				await mailClient.SendAsync(emailMessage);
				await mailClient.DisconnectAsync(true);

				return true;
			}
			catch (Exception)
			{
				return false;
			}

		}

		private MailData GetMailDataWithRestoreToken(RecipeRealmServerUser user)
		{
			return new MailData
			{
				EmailToId = user.Email,
				EmailToName = user.UserName,
				EmailSubject = "Password Reset Request",
				EmailBody = $@"Dear {user.UserName},
				We received a request to reset the password associated with your account. If you initiated this request, please use the following temporary code to reset your password:

				[Reset Token]

				This code is valid for a limited time. If you did not request a password reset, you can safely ignore this email.

				Best regards,
				RecipeRealm support."
			};
		}

		private RecipeRealmServerUser? GetUser(string emailToSend)
		{
			return this.dbContext.Users
				.FirstOrDefault(u => u.Email == emailToSend);
		}
	}
}
