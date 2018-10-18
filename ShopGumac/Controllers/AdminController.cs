using MongoDB.Bson;
using ShopGumac.App_Start;
using ShopGumac.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShopGumac.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        MongoContext client;
        public AdminController() {
            client = new MongoContext();
        }
        public ActionResult ListProduct()
        {
            var res = client.database.GetCollection<ProductModel>("products").FindAll().ToList();
            return View(res);
        }
    }
}