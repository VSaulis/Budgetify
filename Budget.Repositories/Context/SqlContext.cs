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
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupUser> GroupsUsers { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Operation> Operations { get; set; }
        
        public SqlContext (DbContextOptions options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            InitialGroupUserModel(modelBuilder);
            InitialUserModel(modelBuilder);
            InitialNotificationModel(modelBuilder);
            InitialOperationModel(modelBuilder);
            InitialCategoryModel(modelBuilder);
            InitialInvitationModel(modelBuilder);
        }

        private static void InitialGroupUserModel(ModelBuilder modelBuilder)
        {
            var rolesConverter = new ValueConverter<List<Roles>, string>(
                list => JsonConvert.SerializeObject(list.Select(role => role.ToString())),
                jsonRoles => JsonConvert.DeserializeObject<List<Roles>>(jsonRoles)
            );
            
            modelBuilder
                .Entity<GroupUser>()
                .Property(groupUser => groupUser.Roles)
                .HasConversion(rolesConverter);
            
            modelBuilder
                .Entity<GroupUser>()
                .HasOne(groupUser => groupUser.Group)
                .WithMany(group => group.GroupUsers)
                .HasForeignKey(groupUser => groupUser.GroupId);  
            
            modelBuilder
                .Entity<GroupUser>()
                .HasOne(groupUser => groupUser.User)
                .WithMany(user => user.UserGroups)
                .HasForeignKey(groupUser => groupUser.UserId);
        }
        
        private static void InitialInvitationModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Invitation>()
                .HasOne(invitation => invitation.Group)
                .WithMany(group => group.Invitations)
                .HasForeignKey(invitation => invitation.GroupId);  
        }

        private static void InitialUserModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>()
                .Property(user => user.Status)
                .HasConversion(new EnumToStringConverter<UserStatuses>());
        }

        private static void InitialNotificationModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Notification>()
                .Property(notification => notification.Type)
                .HasConversion(new EnumToStringConverter<NotificationTypes>());
            
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
        }

        private static void InitialOperationModel(ModelBuilder modelBuilder)
        {
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

        private static void InitialCategoryModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Category>()
                .HasOne(category => category.Group)
                .WithMany(group => group.Categories)
                .HasForeignKey(category => category.GroupId);
        }
    }
}