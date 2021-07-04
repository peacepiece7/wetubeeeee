import app from "./server.js";
import dotenv from "dotenv";
dotenv.config();
import "./db.js";

app.listen(process.env.PORT || 4000, () => {
  console.log(`listen ${process.env.PORT}`);
});
