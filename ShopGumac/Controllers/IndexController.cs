using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ShopGumac.App_Start;
using ShopGumac.Models;
using System.Collections.Generic;
using System.Web.Mvc;
namespace ShopGumac.Controllers
{
    public class IndexController : Controller
    {
        // GET: Index

        MongoContext cl;
        public IndexController()
        {
            cl = new MongoContext();
            
        }
        public ActionResult Index()
        {
            var collection = cl._database.GetCollection<ProductModel>("products");
            var product = collection.Find(new BsonDocument { }).ToList();                
            return View(product);
        }

        public ActionResult Detail(string id)
        {
            if (string.IsNullOrEmpty(id))
                return RedirectToAction("index");
            var builder = Query<ProductModel>.EQ(p=>p.Id,new ObjectId(id));
            var product = cl.database.GetCollection<ProductModel>("products").FindOne(builder);
            return View(product);
        }

        public ActionResult loadCart()
        {
            Session["quanity"] = 0;
            if (Session["cart"] != null)
            {
                List<CartModel> l = Session["cart"] as List<CartModel>;
                Session["quanity"] = l.Count;
            }
            return View();
        }
        
        public ActionResult loadLogin()
        {
            return View();
        }
    }
}