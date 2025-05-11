using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace binusCareer.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePasswordColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "password");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "password",
                table: "Users",
                newName: "Password");
        }
    }
}
