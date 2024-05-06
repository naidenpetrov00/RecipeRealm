namespace RecipeRealm.Server.GraphQL.Recipes
{
	using RecipeRealm.Server.Models.Recipes;

	public record GetUserRecipesPayload
	{
		public ICollection<UserRecipesModel> UserRecipes { get; set; } = new HashSet<UserRecipesModel>();

		public string Error { get; set; } = string.Empty;
	}
}