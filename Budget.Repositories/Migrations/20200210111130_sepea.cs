using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Budget.Repositories.Migrations
{
    public partial class sepea : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Notifications",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "DecimalValue",
                table: "Notifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StringValue",
                table: "Notifications",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "DecimalValue",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "StringValue",
                table: "Notifications");
        }
    }
}
