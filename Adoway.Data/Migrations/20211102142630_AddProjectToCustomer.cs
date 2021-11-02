using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Adoway.Data.Migrations
{
    public partial class AddProjectToCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Customers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customers_ProjectId",
                table: "Customers",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Projects_ProjectId",
                table: "Customers",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Projects_ProjectId",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_ProjectId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Customers");
        }
    }
}
