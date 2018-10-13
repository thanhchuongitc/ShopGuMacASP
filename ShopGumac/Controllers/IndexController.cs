using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ShopGumac.Models;
using System.Collections.Generic;
using System.Web.Mvc;
namespace ShopGumac.Controllers
{
    public class IndexController : Controller
    {
        // GET: Index

        MongoClient _client;
        IMongoDatabase _database;
        MongoServer _server;
        MongoDatabase database;
        public IndexController()
        {
            _client = new MongoClient("mongodb://admin:123456789Aa@ds127293.mlab.com:27293/shop");
            _server = _client.GetServer();
            database = _server.GetDatabase("shop");
            _database = _client.GetDatabase("shop");
        }
        public ActionResult Index()
        {
            var collection = _database.GetCollection<ProductModel>("products");
            var product = collection.Find(new BsonDocument { }).ToList();                
            return View(product);
        }

        public ActionResult Detail(string id)
        {
            if (string.IsNullOrEmpty(id))
                return RedirectToAction("index");
            var builder = Query<ProductModel>.EQ(p=>p.Id,new ObjectId(id));
            var product = database.GetCollection<ProductModel>("products").FindOne(builder);
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
      
    }
}