namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Common;
	using RecipeRealm.Server.GraphQL.Recipes;

	public interface IRecipesService : IService
	{
		Task<GetUserRecipesCountAndStatsPayload> GetUserRecipesCountAndStats(string email);
		Task<GetUserRecipesPayload> GetUserRecipesAsync(string email);
	}
}
