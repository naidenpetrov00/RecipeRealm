using RecipeRealm.Server.Data;

namespace RecipeRealm.Server.Infrastructure
{
	public static class Seeder
	{

		public static void Seed(WebApplication app)
		{
			using var scope = app.Services.CreateScope();
			var dbContext = scope.ServiceProvider.GetRequiredService<RecipeRealmServerContext>();


			try
			{
				dbContext.Database.EnsureCreated();
			}
			catch (Exception)
			{

				throw;
			}
		}
	}
}
