using Microsoft.AspNetCore.Identity;
using RecipeRealm.Server.Data;
using RecipeRealm.Server.Models.Identity;

namespace RecipeRealm.Server.GraphQL.Mutations
{
	public class Mutation : IdentityMutation
	{
		public Mutation(UserManager<RecipeRealmServerUser> userManager)
			: base(userManager)
		{

		}
	}
}
