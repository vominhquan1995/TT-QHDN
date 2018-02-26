using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HuRe.Migrations
{
    public partial class Update7118 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Roles_RoleId",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Roles_RoleId1",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_Companys_JobGroups_JobGroupId",
                table: "Companys");

            migrationBuilder.DropForeignKey(
                name: "FK_Companys_JobGroups_JobGroupId1",
                table: "Companys");

            migrationBuilder.DropForeignKey(
                name: "FK_CVs_JobGroups_JobGroupId",
                table: "CVs");

            migrationBuilder.DropForeignKey(
                name: "FK_CVs_JobGroups_JobGroupId1",
                table: "CVs");

            migrationBuilder.DropForeignKey(
                name: "FK_CVs_WorkTypes_WorkTypeId",
                table: "CVs");

            migrationBuilder.DropForeignKey(
                name: "FK_CVs_WorkTypes_WorkTypeId1",
                table: "CVs");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_WorkTypes_WorkTypeId1",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_WorkTypeId1",
                table: "Jobs");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_CVs_Id",
                table: "CVs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CVs",
                table: "CVs");

            migrationBuilder.DropIndex(
                name: "IX_CVs_AccountId",
                table: "CVs");

            migrationBuilder.DropIndex(
                name: "IX_CVs_JobGroupId",
                table: "CVs");

            migrationBuilder.DropIndex(
                name: "IX_CVs_JobGroupId1",
                table: "CVs");

            migrationBuilder.DropIndex(
                name: "IX_CVs_WorkTypeId",
                table: "CVs");

            migrationBuilder.DropIndex(
                name: "IX_CVs_WorkTypeId1",
                table: "CVs");

            migrationBuilder.DropIndex(
                name: "IX_Companys_JobGroupId",
                table: "Companys");

            migrationBuilder.DropIndex(
                name: "IX_Companys_JobGroupId1",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "WorkTypes");

            migrationBuilder.DropColumn(
                name: "WorkTypeId1",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "JobGroups");

            migrationBuilder.DropColumn(
                name: "JobGroupId",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "JobGroupId1",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "WorkTypeId",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "WorkTypeId1",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "JobGroupId",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "JobGroupId1",
                table: "Companys");

            migrationBuilder.RenameColumn(
                name: "RoleId1",
                table: "Accounts",
                newName: "CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Accounts_RoleId1",
                table: "Accounts",
                newName: "IX_Accounts_CompanyId");

            migrationBuilder.AddColumn<string>(
                name: "ContentURL",
                table: "Jobs",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "JobGroupId",
                table: "Jobs",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "Events",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "CVs",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<long>(
                name: "RoleId",
                table: "Accounts",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CVs",
                table: "CVs",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Applys",
                columns: table => new
                {
                    AccountId = table.Column<long>(nullable: false),
                    JobId = table.Column<long>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    TimeApply = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applys", x => new { x.AccountId, x.JobId });
                    table.ForeignKey(
                        name: "FK_Applys_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Applys_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_JobGroupId",
                table: "Jobs",
                column: "JobGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_CVs_AccountId",
                table: "CVs",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applys_JobId",
                table: "Applys",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Companys_CompanyId",
                table: "Accounts",
                column: "CompanyId",
                principalTable: "Companys",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Roles_RoleId",
                table: "Accounts",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_JobGroups_JobGroupId",
                table: "Jobs",
                column: "JobGroupId",
                principalTable: "JobGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Companys_CompanyId",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Roles_RoleId",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_JobGroups_JobGroupId",
                table: "Jobs");

            migrationBuilder.DropTable(
                name: "Applys");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_JobGroupId",
                table: "Jobs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CVs",
                table: "CVs");

            migrationBuilder.DropIndex(
                name: "IX_CVs_AccountId",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "ContentURL",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "JobGroupId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "CompanyId",
                table: "Accounts",
                newName: "RoleId1");

            migrationBuilder.RenameIndex(
                name: "IX_Accounts_CompanyId",
                table: "Accounts",
                newName: "IX_Accounts_RoleId1");

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "WorkTypes",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "WorkTypeId1",
                table: "Jobs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "JobGroups",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "CVs",
                nullable: false,
                oldClrType: typeof(long))
                .OldAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<long>(
                name: "JobGroupId",
                table: "CVs",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "JobGroupId1",
                table: "CVs",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "WorkTypeId",
                table: "CVs",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "WorkTypeId1",
                table: "CVs",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "JobGroupId",
                table: "Companys",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "JobGroupId1",
                table: "Companys",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "RoleId",
                table: "Accounts",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_CVs_Id",
                table: "CVs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CVs",
                table: "CVs",
                columns: new[] { "Id", "AccountId" });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_WorkTypeId1",
                table: "Jobs",
                column: "WorkTypeId1");

            migrationBuilder.CreateIndex(
                name: "IX_CVs_AccountId",
                table: "CVs",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_CVs_JobGroupId",
                table: "CVs",
                column: "JobGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_CVs_JobGroupId1",
                table: "CVs",
                column: "JobGroupId1");

            migrationBuilder.CreateIndex(
                name: "IX_CVs_WorkTypeId",
                table: "CVs",
                column: "WorkTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CVs_WorkTypeId1",
                table: "CVs",
                column: "WorkTypeId1");

            migrationBuilder.CreateIndex(
                name: "IX_Companys_JobGroupId",
                table: "Companys",
                column: "JobGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Companys_JobGroupId1",
                table: "Companys",
                column: "JobGroupId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Roles_RoleId",
                table: "Accounts",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Roles_RoleId1",
                table: "Accounts",
                column: "RoleId1",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Companys_JobGroups_JobGroupId",
                table: "Companys",
                column: "JobGroupId",
                principalTable: "JobGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Companys_JobGroups_JobGroupId1",
                table: "Companys",
                column: "JobGroupId1",
                principalTable: "JobGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CVs_JobGroups_JobGroupId",
                table: "CVs",
                column: "JobGroupId",
                principalTable: "JobGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CVs_JobGroups_JobGroupId1",
                table: "CVs",
                column: "JobGroupId1",
                principalTable: "JobGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CVs_WorkTypes_WorkTypeId",
                table: "CVs",
                column: "WorkTypeId",
                principalTable: "WorkTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CVs_WorkTypes_WorkTypeId1",
                table: "CVs",
                column: "WorkTypeId1",
                principalTable: "WorkTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_WorkTypes_WorkTypeId1",
                table: "Jobs",
                column: "WorkTypeId1",
                principalTable: "WorkTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
