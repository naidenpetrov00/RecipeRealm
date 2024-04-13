namespace RecipeRealm.Server.GraphQL.Identity
{
	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Models.Identity;

	public record LoginUserPayload
	{
		public LoginUserModel? User { get; set; } = null;

		public string? UserProfilePicture { get; set; } = null;

		public string? JwtToken { get; set; } = null;

		public IdentityError? Error { get; set; } = null;
	}
}
