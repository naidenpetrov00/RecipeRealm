namespace RecipeRealm.Server.Services.Exceptions
{
	public class RestoreTokenNotAdded : Exception
	{
		private const string message = "Restore token not added to user";

		public RestoreTokenNotAdded()
			: base(message)
		{

		}
	}
}
