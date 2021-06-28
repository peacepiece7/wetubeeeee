import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/usersRouter";
import videoRouter from "./routers/videoRouter";
import bodyParser from "body-parser";
import { localMiddleware } from "./middlewares";
import MongoStore from "mongo-store";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", process.cwd() + "/src/views");

app.engine("pug", require("pug").__express);
app.use("/tmp", express.static("tmp"));

app.use(localMiddleware);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
