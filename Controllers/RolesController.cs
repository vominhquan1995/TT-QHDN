using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HuRe.Controllers
{
    [Route("api/roles")]
    public class RolesController:Controller
    {
        private readonly IRepository<Role> _roleRepo;
        public RolesController(IRepository<Role> roleRepo)
        {
            _roleRepo = roleRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<Role>> Get()
        {
            var roles = await _roleRepo.GetsAsync();
            return roles.Where(w=>!w.Name.ToUpper().Contains("ADMIN"));
        }
        [HttpGet("all")]
        public async Task<IEnumerable<Role>> GetAll()
        {
            return await _roleRepo.GetsAsync();
        }
    }
}