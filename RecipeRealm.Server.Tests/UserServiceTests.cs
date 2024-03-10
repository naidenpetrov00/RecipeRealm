namespace RecipeRealm.Server.UnitTests
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Services.Identity;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.UnitTests.Helpers;

	using NSubstitute;
	using Xunit;
	using FluentAssertions;
	using Microsoft.AspNetCore.Identity;
	using RecipeRealm.Server.GraphQL.Identity;

	public class UserServiceTests
	{
		private readonly RecipeRealmServerContext dbContext;
		private readonly UserService userService;
		private readonly UserManager<RecipeRealmServerUser> userManager;
		private readonly IJwtService jwtService;

		public UserServiceTests()
		{
			var store = Substitute.For<IUserStore<RecipeRealmServerUser>>();
			this.userManager = Substitute.For<UserManager<RecipeRealmServerUser>>(
				store, null, null, null, null, null, null, null, null);
			this.jwtService = Substitute.For<IJwtService>();
			this.dbContext = InMemoryDbContext.GetInMemoryDatabaseContext();
			this.userService = new UserService(this.userManager, jwtService, this.dbContext);
		}

		[Fact]
		public async void CheckUsernameAvailability_ReturnTrue_IfUsernameAvailable()
		{
			var availableUsername = "AvailableUsername";

			var result = await this.userService.CheckForUsername(availableUsername);

			result.Should().BeTrue("because the username should be available");
		}

		[Fact]
		public async void CheckUsernameAvailability_ReturnFalse_IfUsernameNotAvailable()
		{
			var notAvailableUsername = "TestUsername1";

			var result = await this.userService.CheckForUsername(notAvailableUsername);

			result.Should().BeFalse("because the username should not be available");
		}

		[Fact]
		public async void LoginUser_ReturnsUserCredAndJwtToken_IfLoginSuccessfull()
		{
			var userInput = new LoginUserInput(
				 "TestEmail1@gmail.com",
				 "TestPassword1");
			var user = new RecipeRealmServerUser
			{
				Email = userInput.Email,
				PasswordHash = userInput.Password
			};
			var jwtToken = "valid_jwt_token";
			this.userManager.FindByEmailAsync(userInput.Email).Returns(user);
			this.userManager.CheckPasswordAsync(user, userInput.Password).Returns(true);
			this.jwtService.CreateToken(user).Returns(jwtToken);

			var result = await this.userService.LoginUser(userInput);

			result.Should().NotBeNull();
			result.Error.Should().BeNull();
			result.User?.Email.Should().Be(user.Email);
			result.JwtToken.Should().Be(jwtToken);
		}

		[Fact]
		public void LoginUser_ThrowsError_WhenInputNotValid()
		{
			var input = new LoginUserInput(
				 "TestEmail1@gmail.com",
				 "PasswordWithMoreThen20Letters");
			var loginValidator = new LoginUserInputValidator();

			var result = loginValidator.Validate(input);

			result.IsValid.Should().BeFalse();
		}

		[Fact]
		public async void LoginUser_ReturnPayloadWithError_IfUserWithThisEmailNotFound()
		{
			var input = new LoginUserInput(
				"NotExisting@gmail.com",
				"Password1");
			this.userManager.FindByEmailAsync(input.Email).Returns(Task.FromResult<RecipeRealmServerUser>(null));

			var result = await this.userService.LoginUser(input);

			result.Should().NotBeNull();
			result.Error?.Code.Should().Be("User not found");
		}
	}
}
