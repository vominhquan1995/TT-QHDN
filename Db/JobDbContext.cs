using HuRe.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HuRe.Db
{
    public class JobDbContext : DbContext
    {
        public JobDbContext(DbContextOptions<JobDbContext> options)
            : base(options)
        {
          
        }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<CV> CVs { get; set; }
        public DbSet<JobGroup> JobGroups { get; set; }
        public DbSet<WorkType> WorkTypes { get; set; }
        public DbSet<Company> Companys { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Apply> Applys { get; set; }
        public DbSet<Slide> Slides { get; set; }

        //xử lí ràng buộc thông qua kế thừa hàm OnModelCreating, có thể xử lí trực tiếp trong model
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Apply>().HasKey(k => new { k.AccountId, k.JobId });

            builder.Entity<Role>().HasKey(k => k.Id);
            builder.Entity<Role>().HasMany(m => m.Accounts).WithOne(o => o.Role)
                .HasForeignKey(f => f.RoleId).OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Account>().HasKey(k => k.Id);
            builder.Entity<Account>().HasMany(m => m.Applys).WithOne(o => o.Account)
                .HasForeignKey(f => f.AccountId).OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Company>().HasKey(k => k.Id);
            builder.Entity<Company>().HasMany(o => o.Jobs).WithOne(o => o.Company)
                .HasForeignKey(f => f.CompanyId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Company>().HasMany(m => m.Accounts).WithOne(o => o.Company)
                .HasForeignKey(f => f.CompanyId).OnDelete(DeleteBehavior.SetNull);

            builder.Entity<CV>().HasKey(k => k.Id);
            builder.Entity<CV>().HasOne(o => o.Account).WithOne(o => o.CV)
                .HasForeignKey<CV>(f => f.AccountId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Event>().HasKey(k => k.Id);

            builder.Entity<Job>().HasKey(k => k.Id);
            builder.Entity<Job>().HasMany(m => m.Applys).WithOne(o => o.Job)
                .HasForeignKey(f => f.JobId).OnDelete(DeleteBehavior.Cascade);
            //set value default 
            builder.Entity<Job>().Property(b => b.AppliedCount).HasDefaultValue(0);
            builder.Entity<Job>().Property(b => b.ViewCount).HasDefaultValue(0);
            builder.Entity<Job>().Property(b => b.InterviewCount).HasDefaultValue(0);
            builder.Entity<Job>().Property(b => b.PassCount).HasDefaultValue(0);
            builder.Entity<Job>().Property(b => b.FailCount).HasDefaultValue(0);
            builder.Entity<Job>().Property(p=>p.IsHot).HasDefaultValue(false);
            builder.Entity<JobGroup>().HasKey(k => k.Id);
            builder.Entity<JobGroup>().HasMany(m => m.Jobs).WithOne(o => o.JobGroup)
                .HasForeignKey(f => f.JobGroupId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<WorkType>().HasKey(k => k.Id);
            builder.Entity<WorkType>().HasMany(m => m.Jobs).WithOne(o => o.WorkType)
                .HasForeignKey(f => f.WorkTypeId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<JobGroup>().Ignore(i => i.Jobs);
            builder.Entity<WorkType>().Ignore(i => i.Jobs);
            builder.Entity<Company>().Ignore(i => i.Jobs);

            builder.Entity<Slide>().HasKey(k => k.Id);
        }
    }
}
