using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
      public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }

    public class Handler(DataContext context) : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            Console.WriteLine($"🔹 Received Activity ID: {request.Activity.Id}");

            var activity = await context.Activities.FindAsync(request.Activity.Id);
            if (activity == null)
            {
                Console.WriteLine("❌ Activity not found!");
                throw new Exception("Cannot find activity");
            }

            Console.WriteLine($"🔹 Before Update - Title: {activity.Title}, Description: {activity.Description}");
                activity.Title = request.Activity.Title;
                activity.Description = request.Activity.Description;
                activity.Category = request.Activity.Category;
                activity.City = request.Activity.City;
                activity.Venue = request.Activity.Venue;
                activity.date = request.Activity.date;


            Console.WriteLine($"🔹 After Mapping - Title: {activity.Title}, Description: {activity.Description}");
            
            var result = await context.SaveChangesAsync(cancellationToken);
            Console.WriteLine($"✅ SaveChanges Result: {result}");

            return Unit.Value;
            }
    }
}