using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Unit>
    {
        public required string Id { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id, cancellationToken);

            if (activity == null) 
                throw new Exception("Activity not found");

            context.Activities.Remove(activity);

            var result = await context.SaveChangesAsync(cancellationToken);

            if (result == 0) 
                throw new Exception("Failed to delete activity");

            return Unit.Value;
        }
    }
}
