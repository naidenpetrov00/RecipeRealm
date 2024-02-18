namespace RecipeRealm.Server.GraphQL.Identity
{
	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.Models.Identity;
	using System.Collections.Generic;

	public record RegisterUserPayload
	{
		public IEnumerable<IdentityError>? Errors { get; set; } = null;
		public RecipeRealmServerUser? User { get; set; } = null;
	}
}