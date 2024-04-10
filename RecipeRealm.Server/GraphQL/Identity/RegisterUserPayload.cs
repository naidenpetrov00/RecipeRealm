namespace RecipeRealm.Server.GraphQL.Identity
{
	using RecipeRealm.Server.Models.Identity;

	using Microsoft.AspNetCore.Identity;
	using System.Collections.Generic;

	public record RegisterUserPayload
	{
		public RegisterUserModel? User { get; set; } = null;

		public string? JwtToken { get; set; } = null;

		public IEnumerable<IdentityError>? Errors { get; set; } = null;
	}
}