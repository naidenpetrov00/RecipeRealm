namespace RecipeRealm.Server.Infrastructure
{
	using Microsoft.CodeAnalysis.CSharp.Syntax;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.EntityFrameworkCore.Metadata.Internal;
	using RecipeRealm.Server.Common.Enums;
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Data.Models.Recipes;
	using System.Runtime.CompilerServices;

	public static class Seeder
	{
		private static string testUserId = "TestUseerId";
		private static string chefMasterUserId = "ChefMasterId";
		private static string tastyCookingUserId = "TastyCookingId";
		private static IList<RecipeRealmServerUser> usersToAdd = new List<RecipeRealmServerUser>
		{
			new() {Id=testUserId , UserName="Test123",Email="Test123@gmail.com",PasswordHash="Test123@gmail.com"},
			new() {Id=chefMasterUserId, UserName="ChefMaster", Email="chefmaster@example.com", PasswordHash="password123"},
			new() {Id =tastyCookingUserId, UserName="TastyCooking", Email="tastycooking@example.com", PasswordHash="deliciousfood"},
		};

		private static int recipe1Id = 1;
		private static int recipe2Id = 2;
		private static int recipe3Id = 3;
		private static int recipe4Id = 4;
		private static int recipe5Id = 5;
		private static int recipe6Id = 6;

		private static IList<Recipe> recipesToAdd = new List<Recipe>()
{
	new Recipe {
		Name = "RecipeName",
		CookingTime = TimeSpan.FromHours(2),
		Difficulty = DifficultyLevels.Eazy,
		Ingredients = "Ingredient 1, Ingredient 2, Ingredient 3",
		CookingSteps = "Boil Ingredient 1 then mix Ingredient 2 with Ingredient 3 and bake them all together",
		Likes = 26,
		UserId = testUserId
	},
	new Recipe {
		Name = "Spaghetti Carbonara",
		CookingTime = TimeSpan.FromMinutes(30),
		Difficulty = DifficultyLevels.Medium,
		Ingredients = "Spaghetti, Eggs, Parmesan cheese, Pancetta or bacon, Black pepper, Olive oil, Garlic",
		CookingSteps = "Cook spaghetti according to package instructions. In a separate pan, cook pancetta or bacon until crispy. In a bowl, whisk eggs, Parmesan cheese, and black pepper. Once spaghetti is cooked, drain and add to the pan with pancetta. Remove from heat and quickly stir in the egg mixture. The residual heat will cook the eggs and create a creamy sauce. Serve immediately.",
		Likes = 152,
		UserId = chefMasterUserId
	},
	new Recipe {
				Name = "Chocolate Chip Cookies",
		CookingTime = TimeSpan.FromMinutes(20),
		Difficulty = DifficultyLevels.Eazy,
		Ingredients = "All-purpose flour, Baking soda, Salt, Unsalted butter, Brown sugar, Granulated sugar, Vanilla extract, Eggs, Chocolate chips",
		CookingSteps = "Preheat oven to 350°F (175°C). In a bowl, whisk together flour, baking soda, and salt. In another bowl, cream together butter, brown sugar, and granulated sugar until light and fluffy. Beat in vanilla extract and eggs. Gradually add dry ingredients to wet ingredients, mixing until combined. Stir in chocolate chips. Drop spoonfuls of dough onto a baking sheet and bake for 10-12 minutes, or until golden brown.",
		Likes = 315,
			},
	new Recipe {
				Name = "Chicken Tikka Masala",
		CookingTime = TimeSpan.FromHours(1),
		Difficulty = DifficultyLevels.Hard,
		Ingredients = "Chicken thighs, Yogurt, Lemon juice, Garlic, Ginger, Garam masala, Paprika, Cumin, Coriander, Turmeric, Tomato sauce, Heavy cream, Butter, Salt, Pepper",
		CookingSteps = "Marinate chicken thighs in a mixture of yogurt, lemon juice, garlic, ginger, and spices for at least 1 hour. Preheat grill or broiler. Cook chicken until charred and cooked through. In a separate pan, heat butter and add tomato sauce, cream, and more spices. Simmer until thickened. Add cooked chicken to the sauce and simmer for a few more minutes. Serve with rice or naan.",
		Likes = 235,
			},
	new Recipe {
		Id = recipe5Id,
		Name = "Caprese Salad",
		CookingTime = TimeSpan.FromMinutes(10),
		Difficulty = DifficultyLevels.Eazy,
		Ingredients = "Fresh tomatoes, Fresh mozzarella cheese, Fresh basil leaves, Balsamic vinegar, Olive oil, Salt, Pepper",
		CookingSteps = "Slice tomatoes and fresh mozzarella cheese. Arrange alternating slices of tomatoes, mozzarella, and basil leaves on a plate. Drizzle with balsamic vinegar and olive oil. Season with salt and pepper to taste. Serve immediately.",
		Likes = 88,
		UserId = tastyCookingUserId
	},
	new Recipe {
				Name = "Mango Sticky Rice",
		CookingTime = TimeSpan.FromHours(1),
		Difficulty = DifficultyLevels.Medium,
		Ingredients = "Sticky rice, Coconut milk, Sugar, Salt, Ripe mangoes, Sesame seeds",
		CookingSteps = "Soak sticky rice in water for at least 4 hours or overnight. Drain the rice and steam until cooked. In a saucepan, heat coconut milk, sugar, and salt until sugar is dissolved. Pour half of the coconut milk mixture over the cooked rice and let it sit for 10-15 minutes. Peel and slice ripe mangoes. Serve sticky rice with sliced mangoes, drizzle with remaining coconut milk mixture, and sprinkle with sesame seeds.",
		Likes = 123,
			}
};

		private static IList<Comment> commentsToAdd = new List<Comment>
{
	new Comment { CreatedOn = DateTime.UtcNow, Content = "Looks delicious", UserId = testUserId, RecipeId = recipe1Id },
	new Comment { CreatedOn = DateTime.UtcNow, Content = "One of my favorites!", UserId = chefMasterUserId, RecipeId = recipe2Id },
	new Comment { CreatedOn = DateTime.UtcNow, Content = "I'll definitely try this recipe!", UserId = tastyCookingUserId, RecipeId = recipe3Id },
	new Comment { CreatedOn = DateTime.UtcNow, Content = "Perfect for dinner parties!", UserId = chefMasterUserId, RecipeId = recipe4Id },
	new Comment { CreatedOn = DateTime.UtcNow, Content = "Simple yet delicious!", UserId = tastyCookingUserId, RecipeId = recipe5Id },
	new Comment { CreatedOn = DateTime.UtcNow, Content = "Absolutely love this dessert!", UserId = tastyCookingUserId, RecipeId = recipe6Id }
};


		public static async Task Seed(WebApplication app)
		{
			using var scope = app.Services.CreateScope();
			var dbContext = scope.ServiceProvider.GetRequiredService<RecipeRealmServerContext>();

			try
			{
				dbContext.Database.EnsureCreated();

				if (!dbContext.Users.Any())
				{
					dbContext.Users.AddRange(usersToAdd);
					var users = dbContext.Users.AsQueryable();
                    foreach (var user in users)
                    {
                        
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
