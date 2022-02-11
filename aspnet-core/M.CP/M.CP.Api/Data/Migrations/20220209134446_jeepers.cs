using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace M.CP.Api.Data.Migrations
{
    public partial class jeepers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDate",
                table: "Workers",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "Workers");
        }
    }
}
