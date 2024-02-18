namespace RecipeRealm.Server
{
	using RecipeRealm.Server.Data;
	using RecipeRealm.Server.Models.Identity;
	using RecipeRealm.Server.GraphQL.Queries;
	using RecipeRealm.Server.GraphQL.Mutations;

	using global::GraphQL.Server.Ui.Voyager;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.AspNetCore.Identity;

	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			var connectionString = builder.Configuration.GetConnectionString("RecipeRealmServerContextConnection");


			builder.Services
				.AddDefaultIdentity<RecipeRealmServerUser>(options =>
				{
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

			builder.Services.AddScoped<UserManager<RecipeRealmServerUser>>();
			builder.Services.AddScoped<SignInManager<RecipeRealmServerUser>>();

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
