namespace RecipeRealm.Server.Services.Identity
{

	using RecipeRealm.Server.Model;
	using RecipeRealm.Server.Infrastructure;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Data.Models.Identity;

	using MimeKit;
	using MailKit.Net.Smtp;
	using Microsoft.Extensions.Options;
	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.Services.Exceptions;

	public class MailService : IMailService
	{
		private readonly MailSettings _mailSettings;
		private readonly UserManager<RecipeRealmServerUser> userManager;
		private readonly string wrongEmailErrorMessage = "Wrong email!";
		private readonly int restoreTokenTimeSpan = 15;

		public MailService(
			IOptions<MailSettings> mailSettingsOptions,
			UserManager<RecipeRealmServerUser> userManager)
		{
			_mailSettings = mailSettingsOptions.Value;
			this.userManager = userManager;
		}

		public async Task<ForgotPasswordPayload> SendMailWithRestoreTokenAsync(string emailToSend)
		{
			var user = await this.userManager.FindByEmailAsync(emailToSend);
			if (user != null)
			{
				try
				{
					var token = this.GenerateRestoreToken();
					var mailData = GetMailDataWithRestoreToken(user, token);
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

					await this.UpdateUserRestoreToken(user, token);

					return new ForgotPasswordPayload
					{
						EmailSent = true,
					};
				}
				catch (Exception ex)
				{
					return new ForgotPasswordPayload
					{
						EmailSent = false,
						Error = ex.Message
					};
				}
			}

			return new ForgotPasswordPayload
			{
				EmailSent = false,
				Error = this.wrongEmailErrorMessage
			};
		}

		private async Task UpdateUserRestoreToken(RecipeRealmServerUser user, RestoreToken token)
		{
			user.PasswordRestoreToken = token.Value;
			user.PasswordRestoreValidUntil = token.ValidUntil;
			var result = await this.userManager.UpdateAsync(user);
			if (!result.Succeeded)
			{
				throw new RestoreTokenNotAdded();
			}
		}

		private MailData GetMailDataWithRestoreToken(RecipeRealmServerUser user, RestoreToken token)
		{

			return new MailData
			{
				EmailToId = user.Email!,
				EmailToName = user.UserName!,
				EmailSubject = "Password Reset Request",
				EmailBody = $@"Dear {user.UserName},
				We received a request to reset the password associated with your account. If you initiated this request, please use the following temporary code to reset your password:

				{token.Value}
				
				Valid for {this.restoreTokenTimeSpan} minutes.

				This code is valid for a limited time. If you did not request a password reset, you can safely ignore this email.

				Best regards,
				RecipeRealm support."
			};
		}

		private RestoreToken GenerateRestoreToken()
		{
			var random = new Random();
			int randomNumber = random.Next(100000, 999999);
			return new RestoreToken
			{
				Value = randomNumber,
				ValidUntil = DateTime.UtcNow.AddMinutes(this.restoreTokenTimeSpan)
			};
		}
	}
}
