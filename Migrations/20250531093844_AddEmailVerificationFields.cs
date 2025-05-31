using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace binusCareer.Migrations
{
    /// <inheritdoc />
    public partial class AddEmailVerificationFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEmailVerified",
                table: "PICs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "VerificationToken",
                table: "PICs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "VerificationTokenExpiry",
                table: "PICs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "PICs",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IsEmailVerified", "VerificationToken", "VerificationTokenExpiry" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "PICs",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsEmailVerified", "VerificationToken", "VerificationTokenExpiry" },
                values: new object[] { false, null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEmailVerified",
                table: "PICs");

            migrationBuilder.DropColumn(
                name: "VerificationToken",
                table: "PICs");

            migrationBuilder.DropColumn(
                name: "VerificationTokenExpiry",
                table: "PICs");
        }
    }
}
