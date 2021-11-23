using Microsoft.EntityFrameworkCore.Migrations;

namespace Adoway.Data.Migrations
{
    public partial class UpdateScreenModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsUpper",
                table: "Screens",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "ScreenFunctions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsUpper",
                table: "Screens");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "ScreenFunctions");
        }
    }
}
