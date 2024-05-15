namespace RecipeRealm.Server.Services.Interfaces
{
    using RecipeRealm.Server.Common;
    using RecipeRealm.Server.Data.Models.Identity;
    using RecipeRealm.Server.GraphQL.Identity.Inputs;
    using RecipeRealm.Server.GraphQL.Identity.Payloads;

    public interface IUserService : IService
	{
		Task<RegisterUserPayload> RegisterUser(RegisterUserInput userInput);

		Task<LoginUserPayload> LoginUser(LoginUserInput userInput);

		RecipeRealmServerUser CreateUser(RegisterUserInput userInput);

		Task<bool> CheckForUsername(string username);

		Task<bool> CheckForEmail(string email);

		Task<ChangePasswordPayload> ChangePassword(ChangePasswordInput userInput);

		Task<ChangeProfilePicturePayload> ChangeProfilePicture(ChangeProfilePictureInput userInput);

		Task<RecipeRealmServerUser?> GetUserByEmailAsync(string email);
	}
}
