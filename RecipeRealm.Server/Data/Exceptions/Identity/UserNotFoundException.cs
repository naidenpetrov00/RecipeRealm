namespace RecipeRealm.Server.Data.Exceptions.Identity
{
    using Microsoft.AspNetCore.Identity;

    public class UserNotFoundException : IdentityError
    {
        public UserNotFoundException()
        {
            Code = "User not found";
            Description = "Combination of email and password doesn't exists";
        }
    }
}
