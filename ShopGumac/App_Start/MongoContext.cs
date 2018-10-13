using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopGumac.App_Start
{
    public class MongoContext
    {
        MongoClient _client;
        public IMongoDatabase _database;
        MongoServer _server;
        public MongoDatabase database;
        public MongoContext()
        {
            _client = new MongoClient("mongodb://admin:123456789Aa@ds127293.mlab.com:27293/shop");
            _server = _client.GetServer();
            _database = _client.GetDatabase("shop");
            database = _server.GetDatabase("shop");
        }
    }
}