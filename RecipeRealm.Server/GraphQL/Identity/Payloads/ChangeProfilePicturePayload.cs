namespace RecipeRealm.Server.GraphQL.Identity.Payloads
{
    using Microsoft.AspNetCore.Identity;

    public record ChangeProfilePicturePayload
    {
        public bool ProfilePictureChanged { get; set; } = false;

        public IEnumerable<IdentityError> Errors { get; set; } = new HashSet<IdentityError>();

    }
}