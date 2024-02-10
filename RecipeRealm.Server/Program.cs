using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RecipeRealm.Server.Data;
using RecipeRealm.Server.Models.Identity;

namespace RecipeRealm.Server
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			var connectionString = builder.Configuration.GetConnectionString("RecipeRealmServerContextConnection");


			builder.Services
				.AddIdentityApiEndpoints<RecipeRealmServerUser>(options => options.SignIn.RequireConfirmedAccount = true)
				.AddEntityFrameworkStores<RecipeRealmServerContext>();

			builder.Services.AddDbContext<RecipeRealmServerContext>(options => options.UseSqlServer(connectionString));

			// Add services to the container.

			builder.Services.AddControllers();
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

			app.UseAuthorization();

			app.MapControllers();

			app.MapFallbackToFile("/index.html");

			app.Run();
		}
	}
}
