namespace RecipeRealm.Server.GraphQL.Mutations
{
	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Models.Identity;

	public abstract class IdentityMutation
	{
		public async Task<RegisterUserPayload> RegisterUser(
			RegisterUserInput input)
		{
			var user = new RecipeRealmServerUser
			{
				UserName = input.Username,
				Email = input.Email,
			};

			return new RegisterUserPayload(user);
		}
	}
}
