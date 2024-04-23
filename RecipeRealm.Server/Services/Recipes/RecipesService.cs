namespace RecipeRealm.Server.Services.Recipes
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.GraphQL.Recipes;

	using System.Threading.Tasks;

	public class RecipesService : IRecipesService
	{
		private readonly RecipeRealmServerContext dbContext;
		private readonly IUserService userService;

		public RecipesService(
			RecipeRealmServerContext dbContext,
			IUserService userService)
		{
			this.dbContext = dbContext;
			this.userService = userService;
		}

		public async Task<GetUserRecipesPayload> GetUserRecipesAsync(string email)
		{
			var user = await this.userService.GetUserByEmailAsync(email);

			this.dbContext.Recipes
				.Where(r => r.UserId == user.Id)
				.ToList();
		}
	}
}
