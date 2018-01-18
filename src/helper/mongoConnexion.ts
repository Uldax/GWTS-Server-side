/*
Created by : Contat Paul
For any information, please contact at : contat.paul@gmail.com

Create one connexion to mongo database

*/

//Connect to database
import * as mongoose from "mongoose";
import logger from "./logger";

export function connect() {
  const connectionString = process.env["MONGO_URI"] || "mongodb://localhost:27017/riviera"

  //Database connexion
  mongoose.connect(connectionString, { useMongoClient: true, promiseLibrary: global.Promise });
  // (<any>mongoose).Promise = global.Promise;
  mongoose.connection.on("error", () => {
    throw "Can't connect to db" + connectionString;
  });

  mongoose.connection.on("connected", () => {
    logger.debug("Mongoose connection open to " + connectionString);
  });
}
