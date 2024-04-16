namespace RecipeRealm.Server.Data
{
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Data.Models.Recipes;

	using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
	using Microsoft.EntityFrameworkCore;

	public class RecipeRealmServerContext : IdentityDbContext<RecipeRealmServerUser>
	{
		public RecipeRealmServerContext(DbContextOptions<RecipeRealmServerContext> options)
			: base(options)
		{
		}

		public DbSet<Recipe> Recipes { get; set; }

		public DbSet<Comment> Comments { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
		}
	}
}