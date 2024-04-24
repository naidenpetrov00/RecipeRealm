namespace RecipeRealm.Server.Services.Exceptions
{
	public static class UserNotFound
	{
		public static string Description(string userData)
		{
			return $"User {userData} not found!";
		}
	}
}
