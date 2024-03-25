using Microsoft.AspNetCore.Identity;

namespace RecipeRealm.Server.GraphQL.Identity
{
	public record ChangePasswordPayload
	{
		public bool PasswordChanged { get; set; } = false;

		public IEnumerable<IdentityError>? Errors { get; set; } = null;

	}
}