namespace RecipeRealm.Server.GraphQL.Recipes
{
	using RecipeRealm.Server.Common.Enums;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Data.Models.Recipes;

	public class GetUserRecipesPayload
    {
		public int Id { get; set; }

		public string Name { get; set; }

		public TimeSpan CookingTime { get; set; }

		public DifficultyLevels Difficulty { get; set; }

		public string Ingredients { get; set; }

		public string CookingSteps { get; set; }

		public int Likes { get; set; }

		public virtual ICollection<Comment> Comments => new HashSet<Comment>();

		public string UserId { get; set; }

		public virtual RecipeRealmServerUser User { get; set; }
	}
}