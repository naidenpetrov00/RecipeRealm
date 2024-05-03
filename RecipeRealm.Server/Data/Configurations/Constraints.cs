namespace RecipeRealm.Server.Data.Configurations
{
	public static class Constraints
	{
		public static int MaxLengthComment { get; } = 100;
		public static int MaxLengthName { get; } = 256;
		public static int MaxLengthCookingSteps { get; } = 5000;
	}
}
