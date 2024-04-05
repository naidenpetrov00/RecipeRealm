using FluentValidation;

namespace RecipeRealm.Server.GraphQL.Identity
{
	public record ChangeProfilePictureInput(string Email, string Base64Image)
	{
	}

	public class ChangeProfilePictureValidator : AbstractValidator<ChangeProfilePictureInput>
	{
		public ChangeProfilePictureValidator()
		{
			RuleFor(i => i.Email)
					  .NotEmpty()
					  .EmailAddress();

			RuleFor(pp => pp.Base64Image)
				.NotEmpty()
				.NotNull();

		}
	}
}