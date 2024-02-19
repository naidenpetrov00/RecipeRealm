namespace RecipeRealm.Server.GraphQL.Mutations
{
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Models.Identity;

	using Microsoft.AspNetCore.Identity;
	using Microsoft.IdentityModel.JsonWebTokens;
	using RecipeRealm.Server.Services.Interfaces;

	public abstract class IdentityMutation
	{
		public async Task<RegisterUserPayload> RegisterUser(
			RegisterUserInput input,
			[Service] UserManager<RecipeRealmServerUser> userManager,
			[Service] SignInManager<RecipeRealmServerUser> signInManager,
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
	}
}
