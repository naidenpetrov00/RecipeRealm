using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeRealm.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordResetToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<int>(
                name: "PasswordRestoreToken",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "PasswordRestoreValidUntil",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordRestoreToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PasswordRestoreValidUntil",
                table: "AspNetUsers");
        }
    }
}
