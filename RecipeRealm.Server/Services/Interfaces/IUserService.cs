namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Common;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.GraphQL.Identity;

	public interface IUserService : IService
	{
		public Task<RegisterUserPayload> RegisterUser(RegisterUserInput userInput);

		public Task<LoginUserPayload> LoginUser(LoginUserInput userInput);

		public RecipeRealmServerUser CreateUser(RegisterUserInput userInput);

		public Task<bool> CheckForUsername(string username);

		public Task<bool> CheckForEmail(string email);
	}
}
