using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers
{
    public class UserPolicyController : Controller
    {
        public IActionResult Index()
        {
            ViewData["layout"] = "Enduser";
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
    }
}
