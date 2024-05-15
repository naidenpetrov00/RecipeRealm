namespace RecipeRealm.Server.GraphQL.Identity.Inputs
{
    using FluentValidation;

    public record LoginUserInput(string Email, string Password)
    {
    }

    public class LoginUserInputValidator : AbstractValidator<LoginUserInput>
    {
        public LoginUserInputValidator()
        {
            RuleFor(i => i.Email)
                      .NotEmpty()
                      .EmailAddress();

            RuleFor(i => i.Password)
                .NotEmpty()
                .MinimumLength(8)
                .MaximumLength(20);
        }
    }
}