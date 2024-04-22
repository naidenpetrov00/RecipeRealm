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
	new() {
		Name = "RecipeName",
		CookingTime = TimeSpan.FromHours(2),
		Difficulty = DifficultyLevels.Eazy,
		Ingredients = "Ingredient 1, Ingredient 2, Ingredient 3",
		CookingSteps = "Boil Ingredient 1 then mix Ingredient 2 with Ingredient 3 and bake them all together",
		Likes = 26,
	},
	new() {
		Name = "Spaghetti Carbonara",
		CookingTime = TimeSpan.FromMinutes(30),
		Difficulty = DifficultyLevels.Medium,
		Ingredients = "Spaghetti, Eggs, Parmesan cheese, Pancetta or bacon, Black pepper, Olive oil, Garlic",
		CookingSteps = "Cook spaghetti according to package instructions. In a separate pan, cook pancetta or bacon until crispy. In a bowl, whisk eggs, Parmesan cheese, and black pepper. Once spaghetti is cooked, drain and add to the pan with pancetta. Remove from heat and quickly stir in the egg mixture. The residual heat will cook the eggs and create a creamy sauce. Serve immediately.",
		Likes = 152,
	},
	new() {
				Name = "Chocolate Chip Cookies",
		CookingTime = TimeSpan.FromMinutes(20),
		Difficulty = DifficultyLevels.Eazy,
		Ingredients = "All-purpose flour, Baking soda, Salt, Unsalted butter, Brown sugar, Granulated sugar, Vanilla extract, Eggs, Chocolate chips",
		CookingSteps = "Preheat oven to 350°F (175°C). In a bowl, whisk together flour, baking soda, and salt. In another bowl, cream together butter, brown sugar, and granulated sugar until light and fluffy. Beat in vanilla extract and eggs. Gradually add dry ingredients to wet ingredients, mixing until combined. Stir in chocolate chips. Drop spoonfuls of dough onto a baking sheet and bake for 10-12 minutes, or until golden brown.",
		Likes = 315,
			},
	new() {
				Name = "Chicken Tikka Masala",
		CookingTime = TimeSpan.FromHours(1),
		Difficulty = DifficultyLevels.Hard,
		Ingredients = "Chicken thighs, Yogurt, Lemon juice, Garlic, Ginger, Garam masala, Paprika, Cumin, Coriander, Turmeric, Tomato sauce, Heavy cream, Butter, Salt, Pepper",
		CookingSteps = "Marinate chicken thighs in a mixture of yogurt, lemon juice, garlic, ginger, and spices for at least 1 hour. Preheat grill or broiler. Cook chicken until charred and cooked through. In a separate pan, heat butter and add tomato sauce, cream, and more spices. Simmer until thickened. Add cooked chicken to the sauce and simmer for a few more minutes. Serve with rice or naan.",
		Likes = 235,
			},
	new() {
		Name = "Caprese Salad",
		CookingTime = TimeSpan.FromMinutes(10),
		Difficulty = DifficultyLevels.Eazy,
		Ingredients = "Fresh tomatoes, Fresh mozzarella cheese, Fresh basil leaves, Balsamic vinegar, Olive oil, Salt, Pepper",
		CookingSteps = "Slice tomatoes and fresh mozzarella cheese. Arrange alternating slices of tomatoes, mozzarella, and basil leaves on a plate. Drizzle with balsamic vinegar and olive oil. Season with salt and pepper to taste. Serve immediately.",
		Likes = 88,
	},
	new() {
				Name = "Mango Sticky Rice",
		CookingTime = TimeSpan.FromHours(1),
		Difficulty = DifficultyLevels.Medium,
		Ingredients = "Sticky rice, Coconut milk, Sugar, Salt, Ripe mangoes, Sesame seeds",
		CookingSteps = "Soak sticky rice in water for at least 4 hours or overnight. Drain the rice and steam until cooked. In a saucepan, heat coconut milk, sugar, and salt until sugar is dissolved. Pour half of the coconut milk mixture over the cooked rice and let it sit for 10-15 minutes. Peel and slice ripe mangoes. Serve sticky rice with sliced mangoes, drizzle with remaining coconut milk mixture, and sprinkle with sesame seeds.",
		Likes = 123,
			}
};

		private static readonly IList<Comment> commentsToAdd = new List<Comment>
{
	new() { CreatedOn = DateTime.UtcNow.AddDays(1), Content = "One of my favorites!",UserId=testUserId},
	new() { CreatedOn = DateTime.UtcNow.AddMinutes(25), Content = "I'll definitely try this recipe!",UserId=testUserId},
	new() { CreatedOn = DateTime.UtcNow.AddHours(6), Content = "Perfect for dinner parties!",UserId=tastyCookingUserId},
	new() { CreatedOn = DateTime.UtcNow.AddHours(4), Content = "Simple yet delicious!",UserId=chefMasterUserId},
	new() { CreatedOn = DateTime.UtcNow.AddHours(3), Content = "Absolutely love this dessert!",UserId=tastyCookingUserId}
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

					var recipes = dbContext.Recipes.ToList();
					foreach (var recipe in recipes)
					{
						foreach (var comment in commentsToAdd)
						{
							comment.RecipeId = recipe.Id;
							dbContext.Comments.Add(comment);
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