using RecipeRealm.Server.Common;
using RecipeRealm.Server.Data.Models.Identity;

namespace RecipeRealm.Server.Services.Interfaces
{
	public interface IProfilePictureService : IService
	{
		byte[] ParseImageForDB(string base64Image);

		string ParseImageForClient(byte[] imageBytes);

		byte[] GetDefaultPictureBytes();

		string GetDefaultPictureBase64WithPrefix();

		string GetProfilePictureFromUser(byte[]? profilePicture);
	}
}
