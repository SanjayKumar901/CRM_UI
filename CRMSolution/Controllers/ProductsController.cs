using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRMSolution.Auth;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers
{
    [UserAuthorization]
    public class ProductsController : Controller
    {
        public IActionResult RequestaAndResponse()
        {
            return View();
        }

        public IActionResult Renewals()
        {
            return View();
        }
        public IActionResult RequestResponseReport()
        {
            return View();
        }
    }
}