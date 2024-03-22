namespace RecipeRealm.Server.GraphQL.Queries
{
	using RecipeRealm.Server.Services.Interfaces;

	public abstract class IdentityQuery
	{
		public async Task<bool> CheckUsernameAvailability(
			string username,
			[Service] IUserService userService)
		{
			return await userService.CheckForUsername(username);
		}

		public async Task<bool> CheckEmailAvailability(
			string email,
			[Service] IUserService userService)
		{
			return await userService.CheckForEmail(email);
		}

		public async Task<string> SendEmailWithResetToken(
			string email,
			[Service] IMailerSendService mailerService)
		{
			await mailerService.SendEmailWithRestoreToken(email);
		}
	}
}
