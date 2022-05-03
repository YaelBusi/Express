const { MongoClient } = require('mongodb');
const connectionString = "mongodb://srv1:27017";

class dataBase {

  constructor() {

  }
  async connect() {
    const client = new MongoClient(connectionString);
    let connected = await client.connect();
    this.db = connected.db("324842095_ruti-apter_yael-busi");
    console.log("DB Connected!")
  };

  getDB() {
    return this.db;
  }
}


module.exports = new dataBase();