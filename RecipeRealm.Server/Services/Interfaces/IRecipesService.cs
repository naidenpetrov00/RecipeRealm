namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Common;
	using RecipeRealm.Server.GraphQL.Recipes;

	public interface IRecipesService : IService
	{
		Task<GetUserRecipesPayload> GetUserRecipesAsync(string email);
	}
}
