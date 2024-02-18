namespace RecipeRealm.Server.GraphQL.Mutations
{
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Models.Identity;

	using Microsoft.AspNetCore.Identity;

	public abstract class IdentityMutation
	{
		public async Task<RegisterUserPayload> RegisterUser(
			RegisterUserInput input,
			[Service] UserManager<RecipeRealmServerUser> userManager,
			[Service] SignInManager<RecipeRealmServerUser> signInManager)
		{
			var user = new RecipeRealmServerUser
			{
				UserName = input.Username,
				Email = input.Email,
			};

			var result = await userManager.CreateAsync(user, input.Password);

			if (result.Succeeded)
			{
				await signInManager.SignInAsync(user, isPersistent: true);

				return new RegisterUserPayload { User = user };
			}

			return new RegisterUserPayload { Errors = result.Errors };
		}
	}
}
