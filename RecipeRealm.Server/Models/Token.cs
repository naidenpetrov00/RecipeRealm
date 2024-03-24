namespace RecipeRealm.Server.Models
{
	public class Token
	{
		public Token(int randomNumber)
		{
			this.ValidTo = TimeSpan.FromMinutes(15);
			this.Value = randomNumber;
		}

		public TimeSpan ValidTo { get; }
		public int Value { get; }
	}
}
