using RecipeRealm.Server.Data.Models.Identity;

namespace RecipeRealm.Server.Data.Models.Recipes
{
	public class Comment
	{
		public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Content { get; set; }

		public virtual Comment ParentComment { get; set; }

		public string UserId { get; set; }

		public virtual RecipeRealmServerUser User { get; set; }

		public int RecipeId { get; set; }

		public virtual Recipe Recipe { get; set; }
	}
}
