namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Model;

	public interface IMailService
	{
		Task<bool> SendMailWithRestoreTokenAsync(string emailToSend);
	}
}
