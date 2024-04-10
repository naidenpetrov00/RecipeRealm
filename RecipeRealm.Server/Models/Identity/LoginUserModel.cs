namespace RecipeRealm.Server.Models.Identity
{
	using AutoMapper;
	using RecipeRealm.Server.Data.Models.Identity;

	public class LoginUserModel : UserModel
	{
		public byte[]? ProfilePicture { get; set; }

		public class Mapping : Profile
		{
			public Mapping()
			{
				CreateMap<RecipeRealmServerUser, LoginUserModel>();
			}

		}
	}
}
