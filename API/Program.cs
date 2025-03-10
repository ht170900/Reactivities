using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
<<<<<<< HEAD
// Add MediatR
builder.Services.AddMediatR(typeof(Application.AssemblyReference).Assembly);
=======
>>>>>>> 2f05a98653b5c4f0e7dd69bdcc04ed6c3ff542f7
var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
app.UseAuthorization();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000", "http://localhost:3000"));
app.MapControllers();
 //using means temp after the use is completed it will delete the obj
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}catch(Exception ex){
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError($"Error {ex} in the migration");
}
app.Run();
