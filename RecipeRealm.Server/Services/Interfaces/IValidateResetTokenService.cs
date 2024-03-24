namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Common;
	using RecipeRealm.Server.GraphQL.Identity;

	public interface IValidateResetTokenService : IService
	{
		Task<bool> CheckTokenValidity(ValidateTokenInput userInput);
	}
}