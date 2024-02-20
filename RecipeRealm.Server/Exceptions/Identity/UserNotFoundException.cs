namespace RecipeRealm.Server.Exceptions.Identity
{
	using Microsoft.AspNetCore.Identity;

	public class UserNotFoundException : IdentityError
	{
		public UserNotFoundException()
		{
			this.Code = "User not found";
			this.Description = "Combination of email and password doesn't exists";
		}
	}
}
