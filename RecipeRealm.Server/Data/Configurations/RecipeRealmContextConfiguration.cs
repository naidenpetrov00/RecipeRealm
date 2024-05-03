namespace RecipeRealm.Server.Data.Configurations
{
	using RecipeRealm.Server.Data.Models.Recipes;

	using Microsoft.EntityFrameworkCore.Metadata.Builders;
	using Microsoft.EntityFrameworkCore;

	internal sealed class RecipeRealmContextConfiguration : IEntityTypeConfiguration<Recipe>
	{
		public void Configure(EntityTypeBuilder<Recipe> builder)
		{
			builder.ToTable("Recipes");

			builder.Property(r => r.Name)
				.IsRequired()
				.HasMaxLength(Constraints.MaxLengthName);

			builder.Property(r => r.CookingTime)
				.IsRequired();

			builder.Property(r => r.Difficulty)
				.IsRequired();

			builder.Property(r => r.CookingSteps)
				.IsRequired()
				.HasMaxLength(Constraints.MaxLengthCookingSteps);

			builder.Property(r => r.UserId)
				.IsRequired();
		}
	}
}
