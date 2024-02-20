namespace RecipeRealm.Server.GraphQL.Mutations
{
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Models.Identity;

	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.Services;
	using RecipeRealm.Server.Exceptions.Identity;
	using Microsoft.IdentityModel.JsonWebTokens;

	public abstract class IdentityMutation
	{
		public async Task<RegisterUserPayload> RegisterUser(
			RegisterUserInput input,
			[Service] UserManager<RecipeRealmServerUser> userManager,
			[Service] IJwtService jwtService)
		{
			var user = new RecipeRealmServerUser
			{
				UserName = input.Username,
				Email = input.Email,
			};

			var result = await userManager.CreateAsync(user, input.Password);

			if (result.Succeeded)
			{
				var jwtToken = jwtService.CreateToken(user);

				return new RegisterUserPayload { User = user, JwtToken = jwtToken };
			}

			return new RegisterUserPayload { Errors = result.Errors };
		}

		public async Task<LoginUserPayload> LoginUser(
			LoginUserInput userInput,
			[Service] UserManager<RecipeRealmServerUser> userManager,
			[Service] IJwtService jwtService)
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
	}
}
