using Microsoft.EntityFrameworkCore.Migrations;

namespace M.CP.Api.Data.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Companies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_ProjectId",
                table: "Companies",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Projects_ProjectId",
                table: "Companies",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Projects_ProjectId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Companies_ProjectId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Companies");
        }
    }
}
