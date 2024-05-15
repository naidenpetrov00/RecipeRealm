namespace RecipeRealm.Server.GraphQL.Identity.Inputs
{
    using FluentValidation;

    public record RegisterUserInput(string Username, string Email, string Password)
    {
    }
    public class RegisterUserInputValidator : AbstractValidator<RegisterUserInput>
    {
        public RegisterUserInputValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty()
                .MinimumLength(6)
                .MaximumLength(20);

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
