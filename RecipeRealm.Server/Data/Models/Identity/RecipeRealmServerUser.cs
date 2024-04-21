namespace RecipeRealm.Server.Data.Models.Identity
{
	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.Data.Models.Recipes;

	public class RecipeRealmServerUser : IdentityUser
	{
		public int? PasswordRestoreToken { get; set; }

		public DateTime PasswordRestoreValidUntil { get; set; }

		public byte[]? ProfilePicture { get; set; }

		public ICollection<Recipe>? Recipes { get; set; }
	}
}
