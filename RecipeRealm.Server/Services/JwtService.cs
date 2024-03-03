namespace RecipeRealm.Server.Services
{
    using RecipeRealm.Server.Services.Interfaces;

    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    using System.Security.Claims;
    using System.IdentityModel.Tokens.Jwt;
    using RecipeRealm.Server.Data.Models.Identity;

    public class JwtService : IJwtService
	{
		private readonly IConfiguration configuration;
		private readonly JwtSecurityTokenHandler tokenHandler;

		public JwtService(
			IConfiguration configuration,
			JwtSecurityTokenHandler tokenHandler)
		{
			this.configuration = configuration;
			this.tokenHandler = tokenHandler;
		}

		public string CreateToken(RecipeRealmServerUser user)
		{
			var claims = new List<Claim>
			{
				new Claim("Id", user.Id),
				new Claim(ClaimTypes.Name, user.UserName!),
				new Claim(ClaimTypes.Email, user.Email!),
			};
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]!));
			var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.UtcNow.AddHours(1),
				Issuer = configuration["JWT:ValidIssuer"],
				Audience = configuration["JWT:ValidAudience"],
				SigningCredentials = signingCredentials
			};

			var token = this.tokenHandler.CreateToken(tokenDescriptor);
			var jwtToken = this.tokenHandler.WriteToken(token);

			return jwtToken;
		}
	}
}
