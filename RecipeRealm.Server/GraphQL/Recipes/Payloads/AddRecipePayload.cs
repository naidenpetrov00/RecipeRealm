namespace RecipeRealm.Server.GraphQL.Recipes.Payloads
{
	public class AddRecipePayload
	{
		public bool RecipeAdded { get; set; } = false;


		public string? Error { get; set; } = null;
	}
}