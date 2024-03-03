namespace RecipeRealm.Server.GraphQL.Identity
{
    using Microsoft.AspNetCore.Identity;
    using RecipeRealm.Server.Data.Models.Identity;

    public record LoginUserPayload
	{
		public RecipeRealmServerUser? User { get; set; } = null;

		public string? JwtToken { get; set; } = null;

		public IdentityError? Error { get; set; } = null;
	}
}
