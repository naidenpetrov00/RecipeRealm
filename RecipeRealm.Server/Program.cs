namespace RecipeRealm.Server
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Models.Identity;
	using RecipeRealm.Server.GraphQL.Queries;
	using RecipeRealm.Server.GraphQL.Mutations;

	using global::GraphQL.Server.Ui.Voyager;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.AspNetCore.Authentication.JwtBearer;
	using Microsoft.IdentityModel.Tokens;
	using System.Text;
	using RecipeRealm.Server.Services;
	using RecipeRealm.Server.Services.Interfaces;
	using System.IdentityModel.Tokens.Jwt;

	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			var configuration = builder.Configuration;
			var connectionString = configuration.GetConnectionString("RecipeRealmServerContextConnection");

			builder.Services.AddCors();
			builder.Services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(opt =>
			{
				opt.TokenValidationParameters = new TokenValidationParameters
				{
					ValidIssuer = configuration.GetSection("JWT:ValidIssuer").Get<string>(),
					ValidAudience = configuration.GetSection("JWT:ValidAudience").Get<string>(),
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]!)),
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
				};
			});
			builder.Services.AddAuthorization();
			builder.Services
				.AddDefaultIdentity<RecipeRealmServerUser>(options =>
				{
					options.User.RequireUniqueEmail = true;
					options.SignIn.RequireConfirmedAccount = true;
					options.Password.RequiredLength = 8;
					options.Password.RequireNonAlphanumeric = false;
				})
				.AddEntityFrameworkStores<RecipeRealmServerContext>();

			builder.Services.AddDbContext<RecipeRealmServerContext>(options => options.UseSqlServer(connectionString));

			// Add services to the container.
			builder.Services
				.AddGraphQLServer()
				.RegisterDbContext<RecipeRealmServerContext>()
				.AddQueryType<Query>()
				.AddMutationType<Mutation>();

			builder.Services.AddTransient<JwtSecurityTokenHandler>();
			builder.Services.AddScoped<UserManager<RecipeRealmServerUser>>();
			builder.Services.AddScoped<SignInManager<RecipeRealmServerUser>>();
			builder.Services.AddTransient<IJwtService, JwtService>();
			builder.Services.AddHttpContextAccessor();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();

			app.UseDefaultFiles();
			app.UseStaticFiles();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseCors(o => o
			 .AllowAnyHeader()
			 .AllowAnyMethod()
			 .WithOrigins(configuration.GetSection("AllowedOrigins").Get<string[]>()!));
			app.UseHttpsRedirection();
			app.UseAuthentication();
			app.UseAuthorization();

			app.MapGraphQL();
			app.UseGraphQLVoyager("/graphql-voyager", new VoyagerOptions
			{
				GraphQLEndPoint = "/graphql"
			});

			app.MapFallbackToFile("/index.html");

			app.Run();
		}
	}
}
