namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Common;
	using RecipeRealm.Server.GraphQL.Mutations;
	using RecipeRealm.Server.GraphQL.Recipes.Inputs;
	using RecipeRealm.Server.GraphQL.Recipes.Payloads;

	public interface IRecipesService : IService
	{
		Task<GetUserRecipesCountAndStatsPayload> GetUserRecipesCountAndStats(string email);
		Task<GetUserRecipesPayload> GetUserRecipesAsync(string email);
		Task<AddRecipePayload> AddRecipe(AddRecipeInput userInput);
	}
}
