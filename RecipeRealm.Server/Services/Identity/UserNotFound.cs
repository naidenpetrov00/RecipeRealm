namespace RecipeRealm.Server.Services.Identity
{
	using Microsoft.AspNetCore.Identity;

	public class UserNotFound : IdentityError
	{
        public UserNotFound()
            :base()
        {
            
        }
    }
}
