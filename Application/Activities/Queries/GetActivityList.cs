using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityList
    {
        public class Query : IRequest<List<Activity>>{}//req of List<Activity>
        public class Handler(DataContext context): IRequestHandler<Query, List<Activity>>//resp of List<Activity> from handler
        {
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Activities.ToListAsync(); 
                //will return list of the return type
            }
        }
    }
}