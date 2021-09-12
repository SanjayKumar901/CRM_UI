using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers
{
    public class BookingController : Controller
    {
        public IActionResult products()
        {
            return View();
        }
    }
}