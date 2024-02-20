namespace RecipeRealm.Server.GraphQL.Identity
{
	using RecipeRealm.Server.Models.Identity;

	using Microsoft.AspNetCore.Identity;

	public record LoginUserPayload
	{
		public IdentityError? Error { get; set; } = null;
		public RecipeRealmServerUser? User { get; set; } = null;
		public string? JwtToken { get; set; } = null;
	}
}
