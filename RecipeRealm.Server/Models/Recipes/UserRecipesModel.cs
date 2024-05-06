namespace RecipeRealm.Server.Models.Recipes
{
	using RecipeRealm.Server.Common.Enums;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Data.Models.Recipes;
	using RecipeRealm.Server.GraphQL.Recipes;

	using AutoMapper;

	public class UserRecipesModel
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public TimeSpan CookingTime { get; set; }

		public DifficultyLevels Difficulty { get; set; }

		public string CookingSteps { get; set; }

		public int UpVotes { get; set; }

		public int DownVotes { get; set; }

		public int SavesCount { get; set; }

		public string UserId { get; set; }

		public virtual RecipeRealmServerUser User { get; set; }

		
	}
	public class Mapping : Profile
	{
		public Mapping()
		{
			CreateMap<Recipe, UserRecipesModel>();
		}
	}
}