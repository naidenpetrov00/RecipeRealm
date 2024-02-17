namespace RecipeRealm.Server.Models.Identity
{
	using Microsoft.AspNetCore.Identity;

	public class RecipeRealmServerUser : IdentityUser
	{
		public string Password { get; set; }
	}
}
