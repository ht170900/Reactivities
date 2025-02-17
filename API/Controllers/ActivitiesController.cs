using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : BaseApiController // Inherit from ControllerBase
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Activity>> GetActivity(){
            var activity = await _context.Activities.ToListAsync();

            if (activity == null)
            {
                return NotFound(); // Now it works!
            }

            return Ok(activity); // Now it works!
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            var activity = await _context.Activities.FindAsync(id);

            if (activity == null)
            {
                return NotFound(); // Now it works!
            }

            return Ok(activity); // Now it works!
        }
    }
}
