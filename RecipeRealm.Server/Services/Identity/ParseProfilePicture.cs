namespace RecipeRealm.Server.Services.Identity
{
	using RecipeRealm.Server.Services.Interfaces;

	public class ParseProfilePicture : IParseProfilePicture
	{

		private readonly string dataUriPrefix = "data:image/jpeg;base64,";

		public byte[] ForDB(string base64Image)
		{
			var base64WithoutPrefix = base64Image.Replace(this.dataUriPrefix, String.Empty);
			return Convert.FromBase64String(base64WithoutPrefix);
		}
	}
}
