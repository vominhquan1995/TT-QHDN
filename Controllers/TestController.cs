using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HuRe.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        private readonly IRepository<Job> _r;
        public TestController(IRepository<Job> repository)
        {
            _r = repository;
        }
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "Hello", "World" };
        }
        [HttpGet("list")]
        public async Task<IEnumerable<Job>> Gets()
        {
            return await _r.GetsAsync();
        }
    }
}