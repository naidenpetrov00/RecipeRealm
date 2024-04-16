using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipeRealm.Server.Data.Models.Identity;
using RecipeRealm.Server.Data.Models.Recipes;

namespace RecipeRealm.Server.Data.Configurations
{
	internal sealed class RecipeRealmContextConfiguration :
		IEntityTypeConfiguration<Recipe>,
		IEntityTypeConfiguration<Comment>
	{
		public void Configure(EntityTypeBuilder<Recipe> builder)
		{
			builder.ToTable("Recipes");

			builder.HasKey(r => r.Id);

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

			builder.Property(r => r.Likes)
				.IsRequired();

			builder.Property(r => r.UserId)
				.IsRequired();

			builder.HasOne(r => r.User)
				.WithMany(u => u.Recipes);

			builder.HasMany(r => r.Comments)
				.WithOne(c => c.Recipe);
		}

		public void Configure(EntityTypeBuilder<Comment> builder)
		{
			throw new NotImplementedException();
		}
	}
}
