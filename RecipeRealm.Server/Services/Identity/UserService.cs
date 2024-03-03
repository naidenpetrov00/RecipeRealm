namespace RecipeRealm.Server.Services.Identity
{
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Data.Exceptions.Identity;

	using Microsoft.AspNetCore.Identity;

	public class UserService : IUserService
	{
		private readonly UserManager<RecipeRealmServerUser> userManager;
		private readonly IJwtService jwtService;

		public UserService(
			UserManager<RecipeRealmServerUser> userManager,
			IJwtService jwtService)
		{
			this.userManager = userManager;
			this.jwtService = jwtService;
		}

		public RecipeRealmServerUser CreateUser(RegisterUserInput userInput)
		{
			return new RecipeRealmServerUser
			{
				UserName = userInput.Username,
				Email = userInput.Email,
			};
		}

		public async Task<LoginUserPayload> LoginUser(LoginUserInput userInput)
		{
			var user = await userManager.FindByEmailAsync(userInput.Email);
			if (user == null)
			{
				return new LoginUserPayload { Error = new UserNotFoundException() };
			}

			var result = await userManager.CheckPasswordAsync(user, userInput.Password);
			if (result)
			{
				var jwtToken = jwtService.CreateToken(user);
				return new LoginUserPayload()
				{
					User = user,
					JwtToken = jwtToken
				};
			}

			return new LoginUserPayload { Error = new UserNotFoundException() };
		}

		public async Task<RegisterUserPayload> RegisterUser(RegisterUserInput userInput)
		{
			var user = this.CreateUser(userInput);
			var result = await userManager.CreateAsync(user);

			if (result.Succeeded)
			{
				var jwtToken = jwtService.CreateToken(user);

				return new RegisterUserPayload { User = user, JwtToken = jwtToken };
			}
			return new RegisterUserPayload { Errors = result.Errors };
		}
	}
}
