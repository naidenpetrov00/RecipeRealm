using FluentValidation;

namespace RecipeRealm.Server.GraphQL.Identity
{
	public record ChangeProfilePictureInput(string Base64Image, string Email)
	{
	}

	public class ChangeProfilePictureValidator : AbstractValidator<ChangeProfilePictureInput>
	{
		public ChangeProfilePictureValidator()
		{
			RuleFor(pp => pp.Base64Image)
				.NotEmpty()
				.NotNull();

			RuleFor(i => i.Email)
					  .NotEmpty()
					  .EmailAddress();
		}
	}
}