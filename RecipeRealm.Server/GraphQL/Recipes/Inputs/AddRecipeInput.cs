namespace RecipeRealm.Server.GraphQL.Recipes.Inputs
{
	using AutoMapper;
	using FluentValidation;
	using RecipeRealm.Server.Common.Enums;
	using RecipeRealm.Server.Data.Models.Recipes;

	public class AddRecipeInput
	{
		public string Name { get; set; }

		public string UserEmail { get; set; }

		public ICollection<string> RecipeImages { get; set; } = [];

		public string CookingSteps { get; set; }

		public DifficultyLevels Difficulty { get; set; }

		public TimeSpan CookingTime { get; set; }
	}

	public class AddRecipeInputValidator : AbstractValidator<AddRecipeInput>
	{
		public AddRecipeInputValidator()
		{
			RuleFor(r => r.Name)
				.NotEmpty()
				.NotNull()
				.MaximumLength(100);

			RuleFor(r => r.UserEmail)
				.NotEmpty()
				.NotNull()
				.EmailAddress();

			RuleForEach(r => r.RecipeImages)
				.NotEmpty();

			RuleFor(r => r.CookingSteps)
				.NotEmpty()
				.NotNull()
				.MaximumLength(250);

			RuleFor(r => r.Difficulty)
				.NotNull()
				.NotEmpty()
				.IsInEnum();

			RuleFor(r => r.CookingTime)
				.NotEmpty()
				.NotNull()
				.Must(BeValidTimeSpan).WithMessage("Invalid TimeSpan.")
				.Must(BeWithinRange).WithMessage("TimeSpan is not within the allowed range.");
		}
		private bool BeValidTimeSpan(TimeSpan timeSpan)
		{
			return timeSpan >= TimeSpan.Zero;
		}
		private bool BeWithinRange(TimeSpan timeSpan)
		{
			var maxDuration = TimeSpan.FromHours(24);

			return timeSpan <= maxDuration;
		}
	}

	public class Mapping : Profile
	{
		public Mapping()
		{
			CreateMap<AddRecipeInput, Recipe>();

		}
	}
}
