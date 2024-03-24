namespace RecipeRealm.Server.GraphQL.Identity
{
	public record ForgotPasswordPayload
	{
		public bool EmailSent { get; set; } = false;

		public string Error { get; set; } = string.Empty;

	}
}
