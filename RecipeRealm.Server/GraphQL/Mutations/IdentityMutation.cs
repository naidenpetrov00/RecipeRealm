namespace RecipeRealm.Server.GraphQL.Mutations
{
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Services.Interfaces;

	using AppAny.HotChocolate.FluentValidation;

	public abstract class IdentityMutation
	{
		public async Task<RegisterUserPayload> RegisterUser(
			[UseFluentValidation, UseValidator<RegisterUserInputValidator>] RegisterUserInput userInput,
			[Service] IUserService userService)
		{
			return await userService.RegisterUser(userInput);
		}

		public async Task<LoginUserPayload> LoginUser(
			[UseFluentValidation, UseValidator<LoginUserInputValidator>] LoginUserInput userInput,
			[Service] IUserService userService)
		{
			return await userService.LoginUser(userInput);
		}
	}
}
