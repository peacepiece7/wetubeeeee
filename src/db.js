import dotenv from "dotenv";
dotenv.config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "ERROR ㅜㅜ"));
db.once("open", function () {
  console.log("🍎🍇 DB is connected 🍇🥥 ");
});
