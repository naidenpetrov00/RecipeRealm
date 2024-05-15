﻿namespace RecipeRealm.Server.GraphQL.Identity.Payloads
{
    using Microsoft.AspNetCore.Identity;
    using RecipeRealm.Server.Data.Models.Identity;
    using RecipeRealm.Server.Models.Identity;

    public record LoginUserPayload
    {
        public LoginUserModel? User { get; set; } = null;

        public string? UserProfilePicture { get; set; } = string.Empty;

        public string? JwtToken { get; set; } = string.Empty;

        public IdentityError? Error { get; set; } = null;
    }
}
