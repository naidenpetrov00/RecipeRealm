using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeRealm.Server.Migrations
{
    /// <inheritdoc />
    public partial class dropthecolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordRestoreToken",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PasswordRestoreToken",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }
    }
}
