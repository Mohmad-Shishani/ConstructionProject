using M.CP.Entities;
using Microsoft.EntityFrameworkCore;

namespace M.CP.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

        public DbSet<Worker> Workers { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Tool> Tools { get; set; }
        public DbSet<Company> Companies { get; set; }
    }
}
