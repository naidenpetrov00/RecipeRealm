namespace RecipeRealm.Server.GraphQL.Queries
{
	using RecipeRealm.Server.Data;

	public abstract class IdentityQuery
	{
		public bool CheckUsernameAvailability(string username, RecipeRealmServerContext dbContext)
		{
			return !dbContext.Users.Any(u => u.UserName == username);
		}

		public bool CheckEmailAvailability(string email, RecipeRealmServerContext dbContext)
		{
			return !dbContext.Users.Any(u => u.Email == email);
		}
	}
}
