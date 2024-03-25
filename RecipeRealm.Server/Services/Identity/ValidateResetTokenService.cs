namespace RecipeRealm.Server.Services.Identity
{
	using Microsoft.AspNetCore.Identity;
	using Org.BouncyCastle.Tls;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Services.Interfaces;

	public class ValidateResetTokenService : IValidateResetTokenService
	{
		private readonly UserManager<RecipeRealmServerUser> userManager;

		public ValidateResetTokenService(UserManager<RecipeRealmServerUser> userManager)
		{
			this.userManager = userManager;
		}

		public async Task<bool> CheckTokenValidity(ValidateTokenInput userInput)
		{
			var user = await this.userManager.FindByEmailAsync(userInput.Email);
			if (user == null) { return false; }

			if (user.PasswordRestoreToken != null && userInput.Token == user.PasswordRestoreToken.ToString())
			{
				var currentTime = DateTime.UtcNow;

				if (currentTime < user.PasswordRestoreValidUntil)
				{
					return true;
				}
			}

			return false;
		}
	}
}
