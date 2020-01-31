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
        public SqlContext (DbContextOptions<SqlContext> options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var rolesConverter = new ValueConverter<List<Roles>, string>(
                list => JsonConvert.SerializeObject(list.Select(role => role.ToString())),
                jsonRoles => JsonConvert.DeserializeObject<List<Roles>>(jsonRoles)
            );
            
            modelBuilder
                .Entity<User>()
                .Property(user => user.Status)
                .HasConversion(new EnumToStringConverter<UserStatuses>());
            
            modelBuilder
                .Entity<User>()
                .Property(user => user.Roles)
                .HasConversion(rolesConverter);
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Operation> Operations { get; set; }
    }
}