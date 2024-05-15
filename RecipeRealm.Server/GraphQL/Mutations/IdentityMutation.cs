namespace RecipeRealm.Server.GraphQL.Mutations
{
    using RecipeRealm.Server.Services.Interfaces;

    using AppAny.HotChocolate.FluentValidation;
    using RecipeRealm.Server.GraphQL.Identity.Inputs;
    using RecipeRealm.Server.GraphQL.Identity.Payloads;

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

		public async Task<ForgotPasswordPayload> ForgotPassword(
			ForgotPasswordInput userInput,
			[Service] IMailService mailerService)
		{
			return await mailerService.SendMailWithRestoreTokenAsync(userInput.Email);
		}

		public async Task<ChangePasswordPayload> ChangePassword(
			ChangePasswordInput userInput,
			[Service] IUserService userService)
		{
			return await userService.ChangePassword(userInput);
		}

		public async Task<ChangeProfilePicturePayload> ChangePicture(
			ChangeProfilePictureInput userInput,
			[Service] IUserService userService)
		{
			return await userService.ChangeProfilePicture(userInput);
		}
	}
}
