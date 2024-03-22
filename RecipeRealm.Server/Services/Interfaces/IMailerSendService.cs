namespace RecipeRealm.Server.Services.Interfaces
{
    public interface IMailerSendService
    {
        Task SendEmailWithRestoreTokenAsync(string email);
    }
}
