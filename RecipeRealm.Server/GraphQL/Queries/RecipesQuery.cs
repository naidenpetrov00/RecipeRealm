namespace RecipeRealm.Server.GraphQL.Queries
{
	using RecipeRealm.Server.GraphQL.Recipes;
	using RecipeRealm.Server.Services.Interfaces;

	public class RecipesQuery
	{
		public async Task<GetUserRecipesPayload> GetUserRecipes(
			string email,
			[Service] IRecipesService recipesService)
		{
			return await recipesService.GetUserRecipesAsync(email);
		}
	}
}
