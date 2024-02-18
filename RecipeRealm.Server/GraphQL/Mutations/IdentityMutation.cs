namespace RecipeRealm.Server.GraphQL.Mutations
{
	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Models.Identity;

	public abstract class IdentityMutation
	{
		private readonly UserManager<RecipeRealmServerUser> userManager;

		public IdentityMutation(UserManager<RecipeRealmServerUser> userManager)
		{
			this.userManager = userManager;
		}

		public async Task<RegisterUserPayload> RegisterUser(
			RegisterUserInput input)
		{
			var user = new RecipeRealmServerUser
			{
				UserName = input.Username,
				Email = input.Email,
			};

			var result = await this.userManager.CreateAsync(user, input.Password);

			if (result.Succeeded)
			{
				return new RegisterUserPayload { User = user };
			}

			return new RegisterUserPayload { Errors = result.Errors };
		}
	}
}
