namespace RecipeRealm.Server.GraphQL.Identity
{
	public record ForgotPasswordPayload
	{
		public bool EmailSended { get; set; } = false;

		public string Error { get; set; } = string.Empty;

	}
}
