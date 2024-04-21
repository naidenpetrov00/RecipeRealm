namespace RecipeRealm.Server.Data.Configurations
{
	using RecipeRealm.Server.Data.Models.Recipes;

	using Microsoft.EntityFrameworkCore.Metadata.Builders;
	using Microsoft.EntityFrameworkCore;

	internal sealed class RecipeRealmContextConfiguration :
		IEntityTypeConfiguration<Recipe>,
		IEntityTypeConfiguration<Comment>
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

			builder.Property(r => r.Ingredients)
				.IsRequired()
				.HasMaxLength(Constraints.MaxLengthIngredients);

			builder.Property(r => r.CookingSteps)
				.IsRequired()
				.HasMaxLength(Constraints.MaxLengthCookingSteps);

			builder.Property(r => r.UserId)
				.IsRequired();
		}

		public void Configure(EntityTypeBuilder<Comment> builder)
		{
			builder.ToTable("Comments");

			builder.Property(c => c.CreatedOn)
				.IsRequired()
				.HasDefaultValueSql("GETDATE()");

			builder.Property(c => c.Content)
				.IsRequired()
				.HasMaxLength(Constraints.MaxLengthComment);

			builder.Property(c => c.UserId)
				.IsRequired();

			builder.Property(c => c.RecipeId)
				.IsRequired();

			builder.HasOne(c => c.Recipe)
				.WithMany(r => r.Comments)
				.HasForeignKey(c => c.RecipeId)
				.OnDelete(DeleteBehavior.Restrict);
		}
	}
}
