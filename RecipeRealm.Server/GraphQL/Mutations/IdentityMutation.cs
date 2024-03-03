namespace RecipeRealm.Server.GraphQL.Mutations
{
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Services.Interfaces;

	public abstract class IdentityMutation
	{
		public async Task<RegisterUserPayload> RegisterUser(
			RegisterUserInput userInput,
			[Service] IUserService userService)
		{
			return await userService.RegisterUser(userInput);
		}

		public async Task<LoginUserPayload> LoginUser(
		LoginUserInput userInput,
		[Service] IUserService userService)
		{
			return await userService.LoginUser(userInput);
		}
	}
}
