using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Models.ActionModel;
using HuRe.Repositories;
using HuRe.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Service.Repositories;

namespace HuRe.Controllers
{
    public class AuthController : Controller
    {
        private readonly IAccountRepository _accountRepo;
        private readonly IRepository<Role> _roleRepo;
        private readonly ICompanyRepository _companyRepo;
        public AuthController(IAccountRepository accountRepo, IRepository<Role> roleRepo,
        ICompanyRepository companyRepo)
        {
            _accountRepo = accountRepo;
            _roleRepo = roleRepo;
            _companyRepo = companyRepo;
        }
        [HttpPost("api/sign-up/student")]
        public async Task<IActionResult> SignUpForStudent([FromBody] SignUpActionModel model)
        {
            var existAccount = await _accountRepo.CheckAsync(model.Email);
            if (existAccount)
            {
                return BadRequest("This email has used");
            }
            Account account = new Account
            {
                Email = model.Email,
                PasswordHashed = Protector.HashPassword(model.Password),
                Username = model.Username,
                RoleId = model.RoleId,
                FullName = model.FullName,
                Mssv = model.Mssv,
                IsActivated = true
            };
            bool result = await _accountRepo.AddAsync(account);
            if (result)
            {
                return Ok(true);
            }
            return BadRequest(false);
        }
        [HttpPost("api/sign-up/company")]
        public async Task<IActionResult> SignUpForCompany([FromBody] SignUpActionModel model)
        {
            var existAccount = await _accountRepo.CheckAsync(model.Email);
            if (existAccount)
            {
                return BadRequest(false);
            }
            Account account = new Account
            {
                Email = model.Email,
                PasswordHashed = Protector.HashPassword(model.Password),
                Username = model.Username,
                FullName = model.FullName,
                RoleId = model.RoleId,
                IsActivated = false
            };
            Company company = new Company
            {
                Name = model.CompanyName,
                Website = model.CompanyWebsite,
                Status = "waiting",
                TaxCode = model.TaxCode,
                Email = model.CompanyEmail,
                Description = model.CompanyDescription,
                PhoneNumber = model.CompanyPhone,
                Address = model.CompanyAddress
            };
            bool isCreateCompany = await _companyRepo.AddAsync(company);
            if (isCreateCompany)
            {
                account.CompanyId = company.Id;
                bool isCreatedAccount = await _accountRepo.AddAsync(account);
                if (isCreatedAccount)
                {
                    return Ok(true);
                }
            }
            return BadRequest(false);
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("api/login")]
        public async Task<IActionResult> LoginAsync([FromBody]LoginActionModel model)
        {
            if (ModelState.IsValid)
            {
                //This method returns user id from username and password.
                var user = _accountRepo.Login(model.Username, model.Password);
                if (user == null)
                {
                    return BadRequest("Tài khoản không tồn tại");
                }
                else if (!user.IsActivated)
                {
                    return Forbid();
                }
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, model.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
                 };
                var role = await _roleRepo.GetAsync((long)user.RoleId);
                claims.Add(new Claim("Role", role.Name.ToString()));
                claims.Add(new Claim("Id", user.Id.ToString()));
                //get role bỏ vào token
                var token = new JwtSecurityToken
                (
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(60),
                    notBefore: DateTime.UtcNow
                );
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("sadasdsadq4143213dsdadasdasdasdasdsads"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var jwt = new JwtSecurityToken(
                    issuer: "JobHutech",
                    audience: "User",
                    claims: claims,
                    notBefore: DateTime.UtcNow,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromDays(1)),
                    signingCredentials: creds);
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                var response = new
                {
                    token = encodedJwt,
                    guid = user.Guid,
                    id = user.Id,
                    role = role.Name,
                    username = user.FullName,
                    companyId = user.CompanyId,
                    expires_in = (int)TimeSpan.FromDays(1).TotalSeconds
                };
                return Ok(response);
            }

            return BadRequest();
        }
    }
}