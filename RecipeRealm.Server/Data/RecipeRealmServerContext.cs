namespace RecipeRealm.Server.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using RecipeRealm.Server.Data.Models.Identity;

    public class RecipeRealmServerContext : IdentityDbContext<RecipeRealmServerUser>
	{
		public RecipeRealmServerContext(DbContextOptions<RecipeRealmServerContext> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);	
		}
	}
}