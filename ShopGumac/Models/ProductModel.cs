using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopGumac.Models
{
    public class ProductModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("name")]
        public string name { get; set; }
        [BsonElement("prices")]
        public float prices { get; set; }
        [BsonElement("discount")]
        public float discount { get; set; }
        [BsonElement("size")]
        public string[] size { get; set; }
        [BsonElement("color")]
        public string[] color { get; set; }
        [BsonElement("inventory")]
        public int inventory { get; set; }
        [BsonElement("descript")]
        public string descript { get; set; }
        [BsonElement("type")]
        public string type { get; set; }
        [BsonElement("image")]
        public string[] image { get; set; }

        //
        public string ids { get; set; }
        public string _size { get; set; }
        public int _quantity { get; set; }
        public string _color { get; set; }
        public float _prices { get; set; }
        public string _image { get; set; }
    }
}