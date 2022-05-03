const mongoose = require('mongoose');
const envairmant=require('../evnModel');
class MongooseDb {
  constructor() {
  }

  async connect() {
    await mongoose.connect(envairmant.connection_string).then(() => {
      console.log('server runing with mongoose')
    }).catch((error) => {
      console.log(`ERROR in mongoose connection ${error}`);
    });

  };
}
module.exports = new MongooseDb();