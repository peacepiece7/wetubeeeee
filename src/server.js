import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/usersRouter";
import videoRouter from "./routers/videoRouter";
import bodyParser from "body-parser";
import { localMiddleWare } from "./middlewares";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", process.cwd() + "/src/views");
console.log(process.cwd() + "/src/views");
app.engine("pug", require("pug").__express);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
