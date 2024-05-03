namespace RecipeRealm.Server.Infrastructure
{
	using RecipeRealm.Server.Common.Enums;
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Data.Models.Recipes;

	using Microsoft.AspNetCore.Identity;

	public static class Seeder
	{
		private static readonly string testUserId = "TestUseerId";
		private static readonly string chefMasterUserId = "ChefMasterId";
		private static readonly string tastyCookingUserId = "TastyCookingId";
		private static readonly string usersPassword = "Test123@gmail.com";

		private static readonly IList<RecipeRealmServerUser> usersToAdd = new List<RecipeRealmServerUser>
		{
			new() {Id=testUserId , UserName="Test123",Email="Test123@gmail.com",PasswordHash="Test123@gmail.com"},
			new() {Id=chefMasterUserId, UserName="ChefMaster", Email="chefmaster@example.com", PasswordHash="password123"},
			new() {Id =tastyCookingUserId, UserName="TastyCooking", Email="tastycooking@example.com", PasswordHash="deliciousfood"},
		};

		private static readonly IList<Recipe> recipesToAdd = new List<Recipe>()
{
	new Recipe() {
		Name = "RecipeName",
		CookingTime = TimeSpan.FromHours(2),
		Difficulty = DifficultyLevels.Eazy,
		CookingSteps = "Boil Ingredient 1 then mix Ingredient 2 with Ingredient 3 and bake them all together",
		UpVotes = 50,
		DownVotes = 10,
		SavesCount = 15
	},
	new Recipe() {
		Name = "Spaghetti Carbonara",
		CookingTime = TimeSpan.FromMinutes(30),
		Difficulty = DifficultyLevels.Medium,
		CookingSteps = "Cook spaghetti according to package instructions. In a separate pan, cook pancetta or bacon until crispy. In a bowl, whisk eggs, Parmesan cheese, and black pepper. Once spaghetti is cooked, drain and add to the pan with pancetta. Remove from heat and quickly stir in the egg mixture. The residual heat will cook the eggs and create a creamy sauce. Serve immediately.",
		UpVotes = 120,
		DownVotes = 20,
		SavesCount = 30
	},
	new Recipe() {
		Name = "Chocolate Chip Cookies",
		CookingTime = TimeSpan.FromMinutes(20),
		Difficulty = DifficultyLevels.Eazy,
		CookingSteps = "Preheat oven to 350°F (175°C). In a bowl, whisk together flour, baking soda, and salt. In another bowl, cream together butter, brown sugar, and granulated sugar until light and fluffy. Beat in vanilla extract and eggs. Gradually add dry ingredients to wet ingredients, mixing until combined. Stir in chocolate chips. Drop spoonfuls of dough onto a baking sheet and bake for 10-12 minutes, or until golden brown.",
		UpVotes = 280,
		DownVotes = 50,
		SavesCount = 45
	},
	new Recipe() {
		Name = "Chicken Tikka Masala",
		CookingTime = TimeSpan.FromHours(1),
		Difficulty = DifficultyLevels.Hard,
		CookingSteps = "Marinate chicken thighs in a mixture of yogurt, lemon juice, garlic, ginger, and spices for at least 1 hour. Preheat grill or broiler. Cook chicken until charred and cooked through. In a separate pan, heat butter and add tomato sauce, cream, and more spices. Simmer until thickened. Add cooked chicken to the sauce and simmer for a few more minutes. Serve with rice or naan.",
		UpVotes = 200,
		DownVotes = 30,
		SavesCount = 25
	},
	new Recipe() {
		Name = "Caprese Salad",
		CookingTime = TimeSpan.FromMinutes(10),
		Difficulty = DifficultyLevels.Eazy,
		CookingSteps = "Slice tomatoes and fresh mozzarella cheese. Arrange alternating slices of tomatoes, mozzarella, and basil leaves on a plate. Drizzle with balsamic vinegar and olive oil. Season with salt and pepper to taste. Serve immediately.",
		UpVotes = 70,
		DownVotes = 15,
		SavesCount = 20
	},
	new Recipe() {
		Name = "Mango Sticky Rice",
		CookingTime = TimeSpan.FromHours(1),
		Difficulty = DifficultyLevels.Medium,
		CookingSteps = "Soak sticky rice in water for at least 4 hours or overnight. Drain the rice and steam until cooked. In a saucepan, heat coconut milk, sugar, and salt until sugar is dissolved. Pour half of the coconut milk mixture over the cooked rice and let it sit for 10-15 minutes. Peel and slice ripe mangoes. Serve sticky rice with sliced mangoes, drizzle with remaining coconut milk mixture, and sprinkle with sesame seeds.",
		UpVotes = 150,
		DownVotes = 25,
		SavesCount = 35
	}
};


		public static async Task Seed(WebApplication app)
		{
			using var scope = app.Services.CreateScope();
			var dbContext = scope.ServiceProvider.GetRequiredService<RecipeRealmServerContext>();
			var userManager = scope.ServiceProvider.GetRequiredService<UserManager<RecipeRealmServerUser>>();

			try
			{
				dbContext.Database.EnsureCreated();

				if (!dbContext.Users.Any())
				{
					foreach (var user in usersToAdd)
					{
						await userManager.CreateAsync(user, usersPassword);
					}

					var users = dbContext.Users.ToList();
					for (int i = 0; i < users.Count; i++)
					{
						for (int j = i; j <= i + 2; j++)
						{
							recipesToAdd[j].UserId = users[i].Id;
							dbContext.Recipes.Add(recipesToAdd[j]);
						}
					}
					await dbContext.SaveChangesAsync();
				}
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}