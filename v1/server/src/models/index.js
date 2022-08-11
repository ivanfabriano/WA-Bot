import mongoose from "mongoose";
import DbConfig from "../Utilities/DbConfig.js";
import MessageModel from "./MessageModel.js";
import dotenv from "dotenv";

dotenv.config();

const dbURL = process.env.DBURL;
const dbName = process.env.DBNAME;
const db = {};
const collection = {};

db.wabot = new DbConfig(dbURL, dbName);

collection.message = mongoose.model("Message", MessageModel(mongoose.Schema));

export { db, collection };



