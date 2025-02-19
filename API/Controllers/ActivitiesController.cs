using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using MediatR;
using Application.Activities.Queries;
using Application.Command;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController(): BaseApiController // Inherit from ControllerBase
    {
        //private readonly DataContext _context;

        // public ActivitiesController(DataContext context)
        // {
        //     _context = context;
        // }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivity(){
            //var activity = await _context.Activities.ToListAsync();
            var activity = await Mediator.Send(new GetActivityList.Query());

            if (activity == null)
            {
                return NotFound(); 
            }

            return Ok(activity); 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            var activity = await Mediator.Send(new GetActivityDetails.Query { Id = id });

            if (activity == null) return NotFound();
            
            return Ok(activity);
        }

        [HttpPost]
        public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
        {
            var activities = await Mediator.Send(new CreateActivity.Command{Activity = activity});

            if (activities == null) return NotFound();
            
            return Ok(activities);
        }

    }
}
