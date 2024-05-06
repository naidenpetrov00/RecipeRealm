namespace RecipeRealm.Server.Services.Recipes
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Models.Recipes;
	using RecipeRealm.Server.GraphQL.Recipes;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.Services.Exceptions;

	using System.Threading.Tasks;
	using AutoMapper;
	using AutoMapper.QueryableExtensions;
	using NSubstitute;
	using Microsoft.EntityFrameworkCore;

	public class RecipesService : IRecipesService
	{
		private readonly RecipeRealmServerContext dbContext;
		private readonly IUserService userService;
		private readonly IMapper mapper;

		public RecipesService(
			RecipeRealmServerContext dbContext,
			IUserService userService,
			IMapper mapper)
		{
			this.dbContext = dbContext;
			this.userService = userService;
			this.mapper = mapper;
		}

		public async Task<GetUserRecipesCountAndStatsPayload> GetUserRecipesCountAndStats(string email)
		{
			var user = await this.userService.GetUserByEmailAsync(email);
			var recipesStats = this.dbContext.Recipes
				.Where(r => r.UserId == user.Id)
				.ProjectTo<RecipesStatsModel>(this.mapper.ConfigurationProvider)
				.ToList();

			return new GetUserRecipesCountAndStatsPayload
			{
				RecipesCount = recipesStats.Count,
				UpVotes = recipesStats.Sum(r => r.UpVotes),
				DownVotes = recipesStats.Sum(r => r.DownVotes),
				SavesCount = recipesStats.Sum(r => r.SavesCount),
			};
		}

		public async Task<GetUserRecipesPayload> GetUserRecipesAsync(string email)
		{
			var user = await this.userService.GetUserByEmailAsync(email);
			if (user == null)
			{
				return new GetUserRecipesPayload { Error = UserNotFound.Description(email) };
			}

			var recipes = this.dbContext.Recipes
				.Where(r => r.UserId == user.Id)
				.ProjectTo<UserRecipesModel>(mapper.ConfigurationProvider)
				.ToList();

			return new GetUserRecipesPayload { UserRecipes = recipes };
		}
	}
}
