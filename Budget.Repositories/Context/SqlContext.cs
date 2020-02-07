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
            
            // Conversions
            
            modelBuilder
                .Entity<User>()
                .Property(user => user.Status)
                .HasConversion(new EnumToStringConverter<UserStatuses>());
            
            modelBuilder
                .Entity<Notification>()
                .Property(notification => notification.Type)
                .HasConversion(new EnumToStringConverter<NotificationTypes>());
            
            modelBuilder
                .Entity<User>()
                .Property(user => user.Roles)
                .HasConversion(rolesConverter);
            
            // Relationships

            modelBuilder
                .Entity<Category>()
                .HasOne(category => category.CreatedBy)
                .WithMany(user => user.CreatedCategories)
                .HasForeignKey(category => category.CreatedById)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder
                .Entity<Notification>()
                .HasOne(notification => notification.Receiver)
                .WithMany(receiver => receiver.ReceivedNotifications)
                .HasForeignKey(notification => notification.ReceiverId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder
                .Entity<Notification>()
                .HasOne(notification => notification.Notifier)
                .WithMany(receiver => receiver.SendNotifications)
                .HasForeignKey(notification => notification.NotifierId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder
                .Entity<Operation>()
                .HasOne(operation => operation.CreatedBy)
                .WithMany(user => user.CreatedOperations)
                .HasForeignKey(operation => operation.CreatedById)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder
                .Entity<Operation>()
                .HasOne(operation => operation.User)
                .WithMany(user => user.Operations)
                .HasForeignKey(operation => operation.UserId);
            
            modelBuilder
                .Entity<Operation>()
                .HasOne(operation => operation.Category)
                .WithMany(category => category.Operations)
                .HasForeignKey(operation => operation.CategoryId);
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Operation> Operations { get; set; }
    }
}