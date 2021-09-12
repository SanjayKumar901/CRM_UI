using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRMSolution.Auth;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers
{
    [UserAuthorization]
    public class PortalMasterSetupController : Controller
    {
        public IActionResult PortalSetup()
        {
            return View();
        }
    }
}
