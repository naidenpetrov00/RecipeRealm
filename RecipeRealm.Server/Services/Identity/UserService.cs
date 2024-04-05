namespace RecipeRealm.Server.Services.Identity
{
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Data.Exceptions.Identity;

	using Microsoft.AspNetCore.Identity;
	using Microsoft.EntityFrameworkCore;

	public class UserService : IUserService
	{
		private readonly string dataUriPrefix = "data:image/jpeg;base64,";
		private readonly UserManager<RecipeRealmServerUser> userManager;
		private readonly IJwtService jwtService;
		private readonly RecipeRealmServerContext dbContext;

		public UserService(
			UserManager<RecipeRealmServerUser> userManager,
			IJwtService jwtService,
			RecipeRealmServerContext dbContext)
		{
			this.userManager = userManager;
			this.jwtService = jwtService;

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
				var jwtToken = jwtService.CreateToken(user);
				return new LoginUserPayload()
				{
					User = user,
					JwtToken = jwtToken
				};
			}

			return new LoginUserPayload { Error = new UserNotFoundException() };
		}

		public async Task<RegisterUserPayload> RegisterUser(RegisterUserInput userInput)
		{
			var user = this.CreateUser(userInput);
			var result = await userManager.CreateAsync(user, userInput.Password);

			if (result.Succeeded)
			{
				var jwtToken = jwtService.CreateToken(user);
				return new RegisterUserPayload { User = user, JwtToken = jwtToken };
			}

			return new RegisterUserPayload { Errors = result.Errors };
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
				return new ChangeProfilePicturePayload { ProfilePictureChanged = true, };
			}
			var base64WithoutPrefix = userInput.Base64Image.Replace(this.dataUriPrefix, String.Empty);
			var imageBytes = Convert.FromBase64String(base64WithoutPrefix);

			user.ProfilePicture = imageBytes;
			byte[] ImageBytes = user.ProfilePicture;
			string base64String = this.dataUriPrefix + Convert.ToBase64String(ImageBytes);

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

		private async Task<RecipeRealmServerUser?> GetUserByEmailAsync(string email)
		{
			return await this.userManager.FindByEmailAsync(email);
		}
	}
}
