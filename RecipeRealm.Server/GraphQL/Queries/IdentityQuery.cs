namespace RecipeRealm.Server.GraphQL.Queries
{
	using RecipeRealm.Server.GraphQL.Identity;
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

		public async Task<bool> ValidateToken(
			ValidateTokenInput userInput,
			[Service] IValidateResetTokenService validateResetToken)
		{
			return await validateResetToken.CheckTokenValidity(userInput);
		}
	}
}
