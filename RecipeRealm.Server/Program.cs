namespace RecipeRealm.Server
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.GraphQL.Queries;
	using RecipeRealm.Server.GraphQL.Mutations;
	using RecipeRealm.Server.Infrastructure;

	using global::GraphQL.Server.Ui.Voyager;
	using System.Reflection;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.EntityFrameworkCore;
	using FluentValidation.AspNetCore;
	using AppAny.HotChocolate.FluentValidation;
	using RecipeRealm.Server.Models;

	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			var configuration = builder.Configuration;
			var connectionString = configuration.GetConnectionString("RecipeRealmServerContextConnection");

			builder.Services.AddCors();
			builder.Services.AddFluentValidationAndValidators();
			builder.Services.AddJwtAuthentication(configuration);
			builder.Services.AddIdentityServices();
			builder.Services.AddAuthorization();
			builder.Services.AddLogging();
			builder.Services.AddDbContext<RecipeRealmServerContext>(options => options.UseSqlServer(connectionString));
			builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

			builder.Services
				.AddGraphQLServer()
				.RegisterDbContext<RecipeRealmServerContext>()
				.AddQueryType<Query>()
				.AddMutationType<Mutation>()
				.AddFluentValidation();

			builder.Services.Configure<DataProtectionTokenProviderOptions>(
				opt =>
				{
					opt.TokenLifespan = TimeSpan.FromHours(2);
				});
			builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
			builder.Services.AddInterfacedServices();
			builder.Services.AddHttpContextAccessor();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();

			app.UseDefaultFiles();
			app.UseStaticFiles();

			if (app.Environment.IsDevelopment())
			{
				Seeder.Seed(app);
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseCors(o => o
			 .AllowAnyHeader()
			 .AllowAnyMethod()
			 .AllowAnyOrigin());
			//.WithOrigins(configuration.GetSection("AllowedOrigins").Get<string[]>()!));
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
