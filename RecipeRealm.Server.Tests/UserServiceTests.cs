namespace RecipeRealm.Server.UnitTests
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Services.Identity;
	using RecipeRealm.Server.Services.Interfaces;
	using RecipeRealm.Server.GraphQL.Identity;
	using RecipeRealm.Server.UnitTests.Helpers;

	using NSubstitute;
	using Xunit;
	using FluentAssertions;
	using Microsoft.AspNetCore.Identity;

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

			result.User.Should().NotBeNull();
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
			this.userManager
				.FindByEmailAsync(input.Email)
				.Returns(Task.FromResult<RecipeRealmServerUser?>(null));

			var result = await this.userService.LoginUser(input);

			result.Error.Should().NotBeNull();
			result.Error?.Code.Should().Be("User not found");
		}

		[Fact]
		public async void LoginUser_ReturnPayloadWithError_IfThePasswordNotCorrect()
		{
			var wrongPassword = "wrongPassword";
			var input = new LoginUserInput(
				"TestEmail1@gmail.com",
				"TestPassword1");
			var user = new RecipeRealmServerUser
			{
				Email = input.Email,
				PasswordHash = input.Password
			};
			this.userManager
				.FindByEmailAsync(user.Email)
				.Returns(user);
			this.userManager
				.CheckPasswordAsync(user, wrongPassword)
				.Returns(false);

			var result = await this.userService.LoginUser(input);

			result.Error.Should().NotBeNull();
			result.Error?.Code.Should().Be("User not found");
		}

		[Fact]
		public void RegisterUser_ThrowsError_WhenInputNotValid()
		{
			var input = new RegisterUserInput(
				"TestUsername1",
				 "TestEmail1@gmail.com",
				 "PasswordWithMoreThen20Letters");
			var registerValidator = new RegisterUserInputValidator();

			var result = registerValidator.Validate(input);

			result.IsValid.Should().BeFalse();
		}

		[Fact]
		public async void RegisterUser_ReturnsUserCredAndJwtToken_IfRegisterSuccessfull()
		{
			var jwtToken = "BearerToken";
			var input = new RegisterUserInput(
				"NewUser1",
				"NewUser1@gmail.com",
				"NewUser1Password");
			this.userManager
				.CreateAsync(Arg.Any<RecipeRealmServerUser>(), input.Password)
				.Returns(IdentityResult.Success);
			this.jwtService
				.CreateToken(Arg.Any<RecipeRealmServerUser>())
				.Returns(jwtToken);

			var result = await this.userService.RegisterUser(input);

			result.User.Should().NotBeNull();
			result.User?.Email.Should().Be(input.Email);
			result.JwtToken.Should().Be(jwtToken);
		}

		[Fact]
		public async void RegisterUser_ReturnPayloadWithError_IfFailedToCreateUser()
		{
			var input = new RegisterUserInput(
				"NewUser1",
				"NewUser1@gmail.com",
				"PasswordWithMoreThen20Letters");
			var identityError = new IdentityError { Code = "Password too long" };
			this.userManager
				.CreateAsync(Arg.Any<RecipeRealmServerUser>(), input.Password)
				.Returns(IdentityResult.Failed(identityError));

			var result = await this.userService.RegisterUser(input);

			result.Errors
				.Should().NotBeEmpty()
				.And.Contain(e => e.Code == identityError.Code);
		}
	}
}
