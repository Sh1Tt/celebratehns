const mongo =
{
  user: "",
  passwd: "",
  cluster: "",
  db: 
  {
    default: ""
  }
};

module.exports =
{
  reactStrictMode: true,
  env:
  {
    MONGO_URI: `mongodb+srv://${mongo.user}:${mongo.passwd}@${mongo.clustername}.qerqa.mongodb.net/${mongo.db.default}?retryWrites=true&w=majority`
  }
} 