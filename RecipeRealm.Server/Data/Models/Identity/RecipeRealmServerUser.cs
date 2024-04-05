namespace RecipeRealm.Server.Data.Models.Identity
{
	using Microsoft.AspNetCore.Identity;

	public class RecipeRealmServerUser : IdentityUser
	{
		public int? PasswordRestoreToken { get; set; }

		public DateTime PasswordRestoreValidUntil { get; set; }

		public byte[]? ProfilePicture { get; set; }
	}
}
