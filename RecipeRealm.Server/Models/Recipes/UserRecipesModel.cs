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

		public string Ingredients { get; set; }

		public string CookingSteps { get; set; }

		public int Likes { get; set; }

		public int CommentsCount { get; set; }

		public string UserId { get; set; }

		public virtual RecipeRealmServerUser User { get; set; }
	}

	public class Mapping : Profile
	{
		public Mapping()
		{
			CreateMap<Recipe, UserRecipesModel>()
				.ForMember(dest => dest.CommentsCount,
				opt => opt.MapFrom(src => src.Comments.Count));
		}
	}
}