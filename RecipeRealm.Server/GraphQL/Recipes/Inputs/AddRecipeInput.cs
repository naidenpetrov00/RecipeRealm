namespace RecipeRealm.Server.GraphQL.Recipes.Inputs
{
	using AutoMapper;
	using RecipeRealm.Server.Common.Enums;
	using RecipeRealm.Server.Data.Models.Recipes;

	public record AddRecipeInput(
		string UserEmail,
		string RecipeName,
		ICollection<string> RecipeImages,
		string CookingSteps,
		DifficultyLevels Difficulty,
		TimeSpan CookingTime)
	{
	}

	public class Mapping : Profile
	{
		public Mapping()
		{
			CreateMap<Recipe, AddRecipeInput>();

		}
	}
}