using MongoDB.Bson;
using MongoDB.Driver;
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
        private bool checkLogin()
        {
            if (Session["user"] == null)
                return true;
            return false;
        }
        public ActionResult ListProduct()
        {
            if (checkLogin())
                return RedirectToAction("Index","Index");
            var res = client.database.GetCollection<ProductModel>("products").FindAll().ToList();
            return View(res);
        }

        public ActionResult EditProduct(string id) {
            if (checkLogin())
                return RedirectToAction("Index", "Index");
            if (String.IsNullOrEmpty(id))
                return RedirectToAction("ListProduct");
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("_id",ObjectId.Parse(id));
            var product = client._database.GetCollection<BsonDocument>("products").Find(filter).ToList();
            ViewBag.product = product[0];
            return View();
        }
        [HttpPost]
        public void deleteProduct(string id)
        {
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("_id", ObjectId.Parse(id));
            client._database.GetCollection<BsonDocument>("products").FindOneAndDelete(filter);
        }

        public ActionResult partialType()
        {

            return View();
        }
    }
}