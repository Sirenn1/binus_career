using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace binusCareer.Migrations
{
    /// <inheritdoc />
    public partial class FixPICCompanyRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PICs_Companies_CompanyId1",
                table: "PICs");

            migrationBuilder.DropIndex(
                name: "IX_PICs_CompanyId1",
                table: "PICs");

            migrationBuilder.DropColumn(
                name: "CompanyId1",
                table: "PICs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId1",
                table: "PICs",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "PICs",
                keyColumn: "Id",
                keyValue: 1,
                column: "CompanyId1",
                value: null);

            migrationBuilder.UpdateData(
                table: "PICs",
                keyColumn: "Id",
                keyValue: 2,
                column: "CompanyId1",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_PICs_CompanyId1",
                table: "PICs",
                column: "CompanyId1");

            migrationBuilder.AddForeignKey(
                name: "FK_PICs_Companies_CompanyId1",
                table: "PICs",
                column: "CompanyId1",
                principalTable: "Companies",
                principalColumn: "Id");
        }
    }
}
