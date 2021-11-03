using Microsoft.EntityFrameworkCore.Migrations;

namespace Adoway.Data.Migrations
{
    public partial class UpdateSupplierForWorkOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkOrders_Projects_SupplierId",
                table: "WorkOrders");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkOrders_Suppliers_SupplierId",
                table: "WorkOrders",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkOrders_Suppliers_SupplierId",
                table: "WorkOrders");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkOrders_Projects_SupplierId",
                table: "WorkOrders",
                column: "SupplierId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
