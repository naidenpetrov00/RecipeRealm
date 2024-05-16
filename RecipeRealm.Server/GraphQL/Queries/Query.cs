namespace RecipeRealm.Server.GraphQL.Queries
{
	using AppAny.HotChocolate.FluentValidation;
	using RecipeRealm.Server.GraphQL.Recipes.Payloads;
    using RecipeRealm.Server.Services.Interfaces;

    public class Query : IdentityQuery
	{
		public async Task<GetUserRecipesPayload> GetUserRecipes(
			string email,
			[Service] IRecipesService recipesService)
		{
			return await recipesService.GetUserRecipesAsync(email);
		}

		public async Task<GetUserRecipesCountAndStatsPayload> GetUserRecipesCountAndStats(
			string email,
			[Service] IRecipesService recipesService)
		{
			return await recipesService.GetUserRecipesCountAndStats(email);
		}
	}
}
