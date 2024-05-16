namespace RecipeRealm.Server.Services.Identity
{
    using RecipeRealm.Server.Services.Interfaces;
    using RecipeRealm.Server.Data;
    using RecipeRealm.Server.Data.Models.Identity;
    using RecipeRealm.Server.Data.Exceptions.Identity;
    using RecipeRealm.Server.Models.Identity;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using AutoMapper;
    using RecipeRealm.Server.GraphQL.Identity.Inputs;
    using RecipeRealm.Server.GraphQL.Identity.Payloads;

    public class UserService : IUserService
	{
		private readonly UserManager<RecipeRealmServerUser> userManager;
		private readonly IProfilePictureService profilePictureService;
		private readonly IJwtService jwtService;
		private readonly IMapper mapper;
		private readonly RecipeRealmServerContext dbContext;

		public UserService(
			UserManager<RecipeRealmServerUser> userManager,
			IProfilePictureService profilePictureService,
			IJwtService jwtService,
			IMapper mapper,
			RecipeRealmServerContext dbContext)
		{
			this.userManager = userManager;
			this.profilePictureService = profilePictureService;
			this.jwtService = jwtService;
			this.mapper = mapper;
			this.dbContext = dbContext;
		}

		public async Task<bool> CheckForEmail(string email)
		{
			return !await dbContext.Users.AnyAsync(u => u.Email == email);
		}

		public async Task<bool> CheckForUsername(string username)
		{
			return !await dbContext.Users.AnyAsync(u => u.UserName == username);
		}

		public RecipeRealmServerUser CreateUser(RegisterUserInput userInput)
		{
			return new RecipeRealmServerUser
			{
				UserName = userInput.Username,
				Email = userInput.Email,
			};
		}

		public async Task<RegisterUserPayload> RegisterUser(RegisterUserInput userInput)
		{
			var user = this.CreateUser(userInput);
			var result = await userManager.CreateAsync(user, userInput.Password);

			if (result.Succeeded)
			{
				var defaultPictureBase64 = this.profilePictureService.GetDefaultPictureBase64WithPrefix();
				var registerUser = this.mapper.Map<RegisterUserModel>(user);
				var jwtToken = jwtService.CreateToken(user);
				return new RegisterUserPayload
				{
					User = registerUser,
					UserProfilePicture = defaultPictureBase64,
					JwtToken = jwtToken
				};
			}

			return new RegisterUserPayload { Errors = result.Errors };
		}

		public async Task<LoginUserPayload> LoginUser(LoginUserInput userInput)
		{
			var user = await GetUserByEmailAsync(userInput.Email);
			if (user == null)
			{
				return new LoginUserPayload { Error = new UserNotFoundException() };
			}

			var result = await userManager.CheckPasswordAsync(user, userInput.Password);
			if (result)
			{
				var loginUserModel = this.mapper.Map<LoginUserModel>(user);
				var profilePictureBase64 = this.profilePictureService.GetProfilePictureFromUser(user.ProfilePicture);
				var jwtToken = jwtService.CreateToken(user);
				return new LoginUserPayload()
				{
					User = loginUserModel,
					UserProfilePicture = profilePictureBase64,
					JwtToken = jwtToken
				};
			}
			return new LoginUserPayload { Error = new UserNotFoundException() };
		}

		public async Task<ChangePasswordPayload> ChangePassword(ChangePasswordInput userInput)
		{
			var user = await this.GetUserByEmailAsync(userInput.Email);
			if (user == null)
			{
				return new ChangePasswordPayload
				{
					PasswordChanged = false,
					Errors = new[] { new UserNotFoundException() }
				};
			}
			var token = await userManager.GeneratePasswordResetTokenAsync(user);
			var result = await userManager.ResetPasswordAsync(user, token, userInput.NewPassword);
			if (result.Succeeded)
			{
				return new ChangePasswordPayload { PasswordChanged = true, };
			}
			return new ChangePasswordPayload
			{
				PasswordChanged = false,
				Errors = result.Errors
			};
		}

		public async Task<ChangeProfilePicturePayload> ChangeProfilePicture(ChangeProfilePictureInput userInput)
		{
			var user = await this.GetUserByEmailAsync(userInput.Email);
			if (user == null)
			{
				return new ChangeProfilePicturePayload { ProfilePictureChanged = false, };
			}
			var imageBytes = this.profilePictureService.ParseImageForDB(userInput.Base64Image);
			user.ProfilePicture = imageBytes;

			var result = await this.userManager.UpdateAsync(user);
			if (result.Succeeded)
			{
				return new ChangeProfilePicturePayload { ProfilePictureChanged = true, };
			}
			return new ChangeProfilePicturePayload
			{
				ProfilePictureChanged = false,
				Errors = result.Errors
			};
		}

		public async Task<RecipeRealmServerUser?> GetUserByEmailAsync(string email)
		{
			return await this.userManager.FindByEmailAsync(email);
		}
	}
}
