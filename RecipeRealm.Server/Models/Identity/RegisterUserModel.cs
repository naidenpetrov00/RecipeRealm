using AutoMapper;
using RecipeRealm.Server.Data.Models.Identity;

namespace RecipeRealm.Server.Models.Identity
{
	public class RegisterUserModel : UserModel
	{
		public class Mapping : Profile
		{
			public Mapping()
			{
				CreateMap<RecipeRealmServerUser, RegisterUserModel>();
			}

		}
	}
}
