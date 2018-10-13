using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGumac.Models
{
    public class UserModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("name")]
        public string name { get; set; }
        [BsonElement("phone")]
        public string phone { get; set; }
        [BsonElement("address")]
        public string address { get; set; }
        [BsonElement("email")]
        public string email { get; set; }
        [BsonElement("password")]
        public string password { get; set; }
        [BsonElement("sex")]
        public string sex { get; set; }
        [BsonElement("birthday")]
        public string birthday { get; set; }
    }
}