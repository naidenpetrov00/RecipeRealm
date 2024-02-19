namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Models.Identity;

	public interface IJwtService
	{
		public string CreateToken(RecipeRealmServerUser user);
	}
}