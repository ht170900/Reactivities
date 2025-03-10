using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class CreateActivity
    {
        public class Command: IRequest<string>
    {
    public required Activity Activity { get; set; }
    }
    public class Handler(DataContext context): IRequestHandler<Command, string>
    {
        public async Task<string> Handle (Command request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity);
            await context.SaveChangesAsync(cancellationToken);
            return request.Activity.Id;
        }
    }
    }
}