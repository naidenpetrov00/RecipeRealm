namespace RecipeRealm.Server.Models.Recipes
{
	using AutoMapper;
	using RecipeRealm.Server.Data.Models.Recipes;

	public class RecipesStatsModel
	{

		public int UpVotes { get; set; }

		public int DownVotes { get; set; }

		public int SavesCount { get; set; }

		public class Mapping : Profile
		{
			public Mapping()
			{
				CreateMap<Recipe, RecipesStatsModel>();
			}
		}
	}

}