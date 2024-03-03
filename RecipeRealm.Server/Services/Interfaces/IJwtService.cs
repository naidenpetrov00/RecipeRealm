namespace RecipeRealm.Server.Services.Interfaces
{
	using RecipeRealm.Server.Common;
	using RecipeRealm.Server.Data.Models.Identity;

	public interface IJwtService : IService
	{
		public string CreateToken(RecipeRealmServerUser user);
	}
}