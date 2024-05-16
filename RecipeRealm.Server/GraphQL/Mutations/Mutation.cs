namespace RecipeRealm.Server.GraphQL.Mutations
{
	using RecipeRealm.Server.GraphQL.Recipes.Inputs;
	using RecipeRealm.Server.GraphQL.Recipes.Payloads;
	using RecipeRealm.Server.Services.Interfaces;

	using AppAny.HotChocolate.FluentValidation;

	public class Mutation : IdentityMutation
	{
		public async Task<AddRecipePayload> AddRecipe(
			[UseFluentValidation, UseValidator<AddRecipeInputValidator>] AddRecipeInput userInput,
			[Service] IRecipesService recipesService)
		{
			return await recipesService.AddRecipe(userInput);
		}
	}
}
