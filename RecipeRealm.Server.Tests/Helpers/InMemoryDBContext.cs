namespace RecipeRealm.Server.UnitTests.Helpers
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Data.Models.Identity;

	using Microsoft.EntityFrameworkCore;

	internal static class InMemoryDbContext
	{
		public static RecipeRealmServerContext GetInMemoryDatabaseContext()
		{
			var options = new DbContextOptionsBuilder<RecipeRealmServerContext>()
				.UseInMemoryDatabase("InMemoryTestingDb")
				.Options;
			var dbContext = new RecipeRealmServerContext(options);
			if (dbContext.Users.Count() <= 0)
			{
				for (int i = 0; i < 5; i++)
				{
					dbContext.Users.Add(new RecipeRealmServerUser
					{
						UserName = $"TestUsername{i}",
						Email = $"TestEmail{i}@gmail.com",
						PasswordHash = $"TestPassword{i}",
					});
				}
			}
			dbContext.SaveChanges();

			return dbContext;
		}
	}
}
