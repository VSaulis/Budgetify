using System.Collections.Generic;
using System.Linq;
using Budget.Constants.Enums;
using Budget.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace Budget.Repositories.Context
{
    public class SqlContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Operation> Operations { get; set; }
        
        public SqlContext (DbContextOptions options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            InitialUserModel(modelBuilder);
            InitialOperationModel(modelBuilder);
            InitialCategoryModel(modelBuilder);
        }

        private static void InitialUserModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>()
                .Property(user => user.Status)
                .HasConversion(new EnumToStringConverter<UserStatuses>());
        }

        private static void InitialOperationModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Operation>()
                .HasOne(operation => operation.Category)
                .WithMany(category => category.Operations)
                .HasForeignKey(operation => operation.CategoryId);
        }

        private static void InitialCategoryModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Category>()
                .HasOne(category => category.User)
                .WithMany(user => user.Categories)
                .HasForeignKey(category => category.UserId);
        }
    }
}