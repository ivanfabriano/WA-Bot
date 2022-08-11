import mongoose from "mongoose";

class DbConfig {
  constructor(dbUrl, dbName) {
    (this.url = dbUrl), (this.name = dbName);
  }

  start() {
    return mongoose.connect(`${this.url}${this.name}`, {}, () => {
      console.log(`Connected to Mongo database ${this.name}`);
    });
  }
}

export default DbConfig;
