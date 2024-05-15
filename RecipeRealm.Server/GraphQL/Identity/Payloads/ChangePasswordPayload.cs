using Microsoft.AspNetCore.Identity;

namespace RecipeRealm.Server.GraphQL.Identity.Payloads
{
    public record ChangePasswordPayload
    {
        public bool PasswordChanged { get; set; } = false;

        public IEnumerable<IdentityError> Errors { get; set; } = new HashSet<IdentityError>();

    }
}