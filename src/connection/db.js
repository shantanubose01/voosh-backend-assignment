import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbURI = process.env.DBURL;

export const _mongoInstance = mongoose.createConnection(dbURI, {

  retryWrites: false,
  bufferCommands: true,
  // poolSize: 200,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useNewUrlParser: true,
  readPreference: "primaryPreferred",
});

// CONNECTION EVENTS

// When successfully connected
_mongoInstance.on("connected", function () {
  console.log("Mongoose connection open to master DB");
});

// If the connection throws an error
_mongoInstance.on("error", function (err) {
  console.log("Mongoose connection error for master DB: " + err);
});

// When the connection is disconnected
_mongoInstance.on("disconnected", function () {
  console.log("Mongoose connection disconnected for master DB");
});

//When connection is reconnected
_mongoInstance.on("reconnected", function () {
  console.log("Mongoose connection open to master DB");
});
