using Microsoft.EntityFrameworkCore.Migrations;

namespace Budget.Repositories.Migrations
{
    public partial class sepea1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EntityId",
                table: "Notifications",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EntityId",
                table: "Notifications");
        }
    }
}
