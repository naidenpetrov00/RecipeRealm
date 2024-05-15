namespace RecipeRealm.Server.GraphQL.Identity.Payloads
{
    public record ForgotPasswordPayload
    {
        public bool EmailSent { get; set; } = false;

        public string Error { get; set; } = string.Empty;

    }
}
