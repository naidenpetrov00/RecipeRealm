namespace RecipeRealm.Server.UnitTests
{
    using Microsoft.EntityFrameworkCore;
    using NSubstitute;
    using RecipeRealm.Server.Data;
    using RecipeRealm.Server.Data.Models.Identity;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Xunit;

    public class UserServiceTests
    {
        private readonly List<RecipeRealmServerUser> users;
        private readonly RecipeRealmServerContext dbContext;

        public UserServiceTests()
        {
            var data = new List<RecipeRealmServerUser>
            {
                new RecipeRealmServerUser{UserName="AlreadyCreatedUser",Email="AlreadyCreatedUser@gmail.com"},
                new RecipeRealmServerUser{UserName="NotCreatedUser",Email="NotCreatedUser@gmail.com"},
            };
            var users = Substitute
                .For<DbSet<RecipeRealmServerUser>>();
            dbContext = Substitute.For<RecipeRealmServerContext>();
        }

        [Fact]
        public void CheckUsernameAvailability_ReturnTrueIfUsernameAvailable()
        {

        }

    }
}
