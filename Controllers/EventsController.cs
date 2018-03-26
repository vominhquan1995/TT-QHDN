using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Repositories;
using Microsoft.AspNetCore.Mvc;
using HuRe.Models.ResultModels;
using HuRe.Models.ActionModel;
using System;
using HuRe.Util;
using Microsoft.AspNetCore.Authorization;

namespace HuRe.Controllers
{
    [Route("api/events")]
    public class EventsController : Controller
    {
        private readonly IRepository<Event> _eventRepo;
        private readonly IFileService _fileService;

        public EventsController(IRepository<Event> eventRepo, IFileService fileService)

        {
            _eventRepo = eventRepo;
            _fileService = fileService;
        }
        #region api dung cho admin
        [HttpPost("page")]
        [Authorize(Policy = "Admin")]
        public async Task<ModelPaging<Event>> Post([FromBody]FilterPageActionModel body)
        {
            var Events = await _eventRepo.GetsAsync();
            Events = Events.OrderByDescending(x => x.CreatedDate);
            if (body.KeySearch != null)
            {
                Events = Events.Where(a => a.Title.Contains(body.KeySearch) || a.Name.Contains(body.KeySearch)).ToList();
            }
            //time out
            // if (body.IsActivated == 1)
            // {
            //     Events = Events.Where(a => a.EndTime <= DateTime.Now).ToList();
            // }
            //coming soon
            // if (body.IsActivated == 2)
            // {
            //     Events = Events.Where(a => a.EndTime > DateTime.Now && a.StartTime > DateTime.Now).ToList();
            // }
            //ongoing
            // if (body.IsActivated == 3)
            // {
            //     Events = Events.Where(a => a.EndTime > DateTime.Now && a.StartTime <= DateTime.Now).ToList();
            // }
            var total = Events.Count();
            var ofsset = (body.CurrentPage * body.NumberItemPage) - body.NumberItemPage;
            Events = Events.Skip(ofsset).Take(body.NumberItemPage).ToList();
            return new ModelPaging<Event>
            {
                total = total,
                data = Events
            };
        }
        [HttpPost("create")]
        [Authorize(Policy = "Admin")]
        public async Task<bool> Create([FromBody]Event form)
        {
            return await _eventRepo.AddAsync(form);
        }
        [HttpPut("update/{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<bool> Update(long id, [FromBody]Event form)
        {
            return await _eventRepo.UpdateAsync(id, form);
        }
        [HttpGet("info/{id}")]
        public async Task<Event> GetInfo(long id)
        {
            return await _eventRepo.GetAsync(id);
        }
        [HttpDelete("delete/{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<bool> Delete(long id)
        {
            var item = await _eventRepo.GetAsync(id);
            if (_fileService.DeleteFile(item.ImageURL))
            {
                return await _eventRepo.RemoveAsync(id);
            }
            else
            {
                return false;
            }

        }
        #endregion
        [HttpGet]
        public async Task<IEnumerable<Event>> GetAll()
        {
            return (await _eventRepo.GetsAsync()).OrderByDescending(x => x.CreatedDate).Take(100);
        }
        [HttpGet("{id}")]
        public async Task<Event> Get(long id)
        {
            return await _eventRepo.GetAsync(id);
        }

        [HttpGet("{id}/related")]
        public async Task<IEnumerable<Event>> GetRelatedEvents(long id)
        {
            var events = await _eventRepo.GetsAsync();
            return events.OrderByDescending(z => z.CreatedDate).Take(3);
        }

        [HttpGet("opening")]
        public async Task<IEnumerable<Event>> GetOpeningEvents()
        {
            var events = await _eventRepo.GetsAsync();
            // var timeNow = DateTime.UtcNow.AddHours(7);
            // var opening = events.Where(z => z.StartTime < timeNow && z.EndTime > timeNow).ToList();
            // if (opening.Count() < 3)
            // {
            //     var notOpenYet = events.Where(z => z.StartTime >= timeNow || z.EndTime <= timeNow).ToList();
            //     foreach (var item in notOpenYet)
            //     {
            //         opening.Add(item);
            //     }
            //     var error = events.Where(z => z.StartTime <= timeNow || z.EndTime >= timeNow).ToList();
            //     foreach (var item in error)
            //     {
            //         opening.Add(item);
            //     }
            // }
            // return opening.Take(3);
            return events.Take(3);
        }
    }
}
