namespace RecipeRealm.Server.GraphQL.Identity
{
	using FluentValidation;

	public record ChangePasswordInput(string Email, string NewPassword)
	{
	}

	public class ChangePasswordInputvalidator : AbstractValidator<ChangePasswordInput>
	{
		public ChangePasswordInputvalidator()
		{
			RuleFor(i => i.NewPassword)
				.NotEmpty()
				.MinimumLength(8)
				.MaximumLength(20);
		}
	}
}