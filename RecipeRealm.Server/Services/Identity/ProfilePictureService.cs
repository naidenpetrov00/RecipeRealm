namespace RecipeRealm.Server.Services.Identity
{
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Services.Interfaces;

	public class ProfilePictureService : IProfilePictureService
	{

		private readonly string dataUriPrefix = "data:image/jpeg;base64,";

		public string ParseImageForClient(byte[] imageBytes)
		{
			return this.dataUriPrefix + Convert.ToBase64String(imageBytes);
		}

		public byte[] ParseImageForDB(string base64Image)
		{
			var base64WithoutPrefix = base64Image.Replace(this.dataUriPrefix, String.Empty);
			return Convert.FromBase64String(base64WithoutPrefix);
		}

		public byte[] GetDefaultPictureBytes()
		{
			string defaultProfilePicturePath = @".\wwwroot\profile-pictures\defaultProfilePicture.jpg";
			string fullDefaultProfilePicturePath = System.IO.Path.GetFullPath(defaultProfilePicturePath);

			return File.ReadAllBytes(fullDefaultProfilePicturePath);
		}

		public string GetDefaultPictureBase64WithPrefix()
		{
			var pictureBytes = this.GetDefaultPictureBytes();
			return this.ParseImageForClient(pictureBytes);
		}

		public string GetProfilePictureFromUser(byte[]? profilePicture)
		{
			if (profilePicture == null)
			{
				return this.GetDefaultPictureBase64WithPrefix();
			}

			return this.ParseImageForClient(profilePicture);
		}
	}
}
