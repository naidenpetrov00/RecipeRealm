namespace RecipeRealm.Server.GraphQL.Identity
{
    using Microsoft.AspNetCore.Identity;
    using System.Collections.Generic;
    using RecipeRealm.Server.Data.Models.Identity;

    public record RegisterUserPayload
	{
		public RecipeRealmServerUser? User { get; set; } = null;

		public string? JwtToken { get; set; } = null;

		public IEnumerable<IdentityError>? Errors { get; set; } = null;
	}
}