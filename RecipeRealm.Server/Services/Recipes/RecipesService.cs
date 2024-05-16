namespace RecipeRealm.Server.Services.Recipes
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Models.Recipes;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.Services.Exceptions;
	using RecipeRealm.Server.GraphQL.Recipes.Inputs;
	using RecipeRealm.Server.GraphQL.Recipes.Payloads;

	using System.Threading.Tasks;
	using AutoMapper;
	using AutoMapper.QueryableExtensions;
	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Data.Models.Recipes;

	public class RecipesService : IRecipesService
	{
		private readonly RecipeRealmServerContext dbContext;
		private readonly UserManager<RecipeRealmServerUser> userManager;
		private readonly IUserService userService;
		private readonly IMapper mapper;

		public RecipesService(
			RecipeRealmServerContext dbContext,
			UserManager<RecipeRealmServerUser> userManager,
			IUserService userService,
			IMapper mapper)
		{
			this.dbContext = dbContext;
			this.userManager = userManager;
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
			if (user is null)
			{
				return new GetUserRecipesPayload { Error = UserNotFound.Description(email) };
			}

			var recipes = this.dbContext.Recipes
				.Where(r => r.UserId == user.Id)
				.ProjectTo<UserRecipesModel>(mapper.ConfigurationProvider)
				.ToList();

			return new GetUserRecipesPayload { UserRecipes = recipes };
		}

		public async Task<AddRecipePayload> AddRecipe(AddRecipeInput userInput)
		{
			var user = await this.userService.GetUserByEmailAsync(userInput.UserEmail);
			if (user is null)
			{
				return new AddRecipePayload { Error = UserNotFound.Description(userInput.UserEmail) };
			}

			var recipe = this.mapper.Map<Recipe>(userInput);
			recipe.UserId = user.Id;
			await this.dbContext.Recipes.AddAsync(recipe);
			await this.dbContext.SaveChangesAsync();

			return new AddRecipePayload { RecipeAdded = true };
		}
	}
}
