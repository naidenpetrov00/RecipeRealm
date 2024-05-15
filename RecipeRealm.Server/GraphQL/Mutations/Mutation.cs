namespace RecipeRealm.Server.GraphQL.Mutations
{
	using RecipeRealm.Server.GraphQL.Recipes.Inputs;
	using RecipeRealm.Server.Services.Interfaces;

	public class Mutation : IdentityMutation
	{
		public async Task<AddRecipePayload> AddRecipe(
			AddRecipeInput userInput,
			[Service] IRecipesService recipesService)
		{
			return await recipesService.AddRecipe(userInput);
		}
	}
}
