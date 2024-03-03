namespace RecipeRealm.Server
{
	using RecipeRealm.Server.Data;
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
	using RecipeRealm.Server.Services.Identity;
	using RecipeRealm.Server.Data.Models.Identity;
	using RecipeRealm.Server.Infrastructure;

	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			var configuration = builder.Configuration;
			var connectionString = configuration.GetConnectionString("RecipeRealmServerContextConnection");

			builder.Services.AddCors();
			builder.Services.AddJwtAuthentication(configuration);
			builder.Services.AddIdentityServices();
			builder.Services.AddAuthorization();

			builder.Services.AddDbContext<RecipeRealmServerContext>(options => options.UseSqlServer(connectionString));

			builder.Services
				.AddGraphQLServer()
				.RegisterDbContext<RecipeRealmServerContext>()
				.AddQueryType<Query>()
				.AddMutationType<Mutation>();

			builder.Services.AddInterfacedServices();
			builder.Services.AddHttpContextAccessor();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();

			app.UseDefaultFiles();
			app.UseStaticFiles();

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
