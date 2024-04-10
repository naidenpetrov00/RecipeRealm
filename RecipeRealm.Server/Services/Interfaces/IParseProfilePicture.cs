using RecipeRealm.Server.Common;

namespace RecipeRealm.Server.Services.Interfaces
{
	public interface IParseProfilePicture : IService
	{
		byte[] ForDB(string base64Image);
	}
}
