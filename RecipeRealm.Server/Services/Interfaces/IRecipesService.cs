namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.GraphQL.Recipes;

	public interface IRecipesService
    {
        Task<GetUserRecipesPayload> GetUserRecipesAsync(string email);
    }
}
