namespace RecipeRealm.Server.Infrastructure
{
    using RecipeRealm.Server.Common;
    using RecipeRealm.Server.Data.Models.Identity;
    using RecipeRealm.Server.Data;

    using System.Text;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;
    using FluentValidation.AspNetCore;
    using RecipeRealm.Server.GraphQL.Identity.Inputs;

    public static class ServiceCollectionExtensions
	{
		public static IServiceCollection AddFluentValidationAndValidators(this IServiceCollection services)
		{
			services.AddFluentValidationAutoValidation();

			services.AddTransient<LoginUserInputValidator>();
			services.AddTransient<RegisterUserInputValidator>();
			services.AddTransient<ChangePasswordInputvalidator>();
			services.AddTransient<ChangeProfilePictureValidator>();

			return services;
		}

		public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddAuthentication(options =>
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

			services.AddTransient<JwtSecurityTokenHandler>();

			return services;
		}

		public static IServiceCollection AddIdentityServices(this IServiceCollection services)
		{
			services
				.AddDefaultIdentity<RecipeRealmServerUser>(options =>
				{
					options.User.RequireUniqueEmail = true;
					options.SignIn.RequireConfirmedAccount = true;
					options.Password.RequiredLength = 8;
					options.Password.RequireNonAlphanumeric = false;
				})
				.AddEntityFrameworkStores<RecipeRealmServerContext>();


			services.AddScoped<UserManager<RecipeRealmServerUser>>();
			services.AddScoped<SignInManager<RecipeRealmServerUser>>();

			return services;
		}

		public static IServiceCollection AddInterfacedServices(
			this IServiceCollection services)
		{
			var serviceInterfaceType = typeof(IService);
			var serviceScopedInterfaceType = typeof(IScopedService);
			var serviceSingletonInterfaceType = typeof(ISingletonService);

			var types = serviceInterfaceType
				.Assembly
				.GetExportedTypes()
				.Where(t => t.IsClass && !t.IsAbstract)
				.Select(t => new
				{
					Service = t.GetInterface($"I{t.Name}"),
					Implementation = t
				})
				.Where(t => t.Service != null);

			foreach (var type in types)
			{
				if (serviceInterfaceType.IsAssignableFrom(type.Service))
				{
					services.AddTransient(type.Service, type.Implementation);
				}
				else if (serviceScopedInterfaceType.IsAssignableFrom(type.Service))
				{
					services.AddScoped(type.Service, type.Implementation);
				}
				else if (serviceSingletonInterfaceType.IsAssignableFrom(type.Service))
				{
					services.AddSingleton(type.Service, type.Implementation);
				}
			}

			return services;
		}
	}
}
