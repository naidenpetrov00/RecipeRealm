namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Common;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Model;

	public interface IMailService : IService
	{
		Task<ForgotPasswordPayload> SendMailWithRestoreTokenAsync(string emailToSend);
	}
}
