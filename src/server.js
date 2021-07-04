import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import helmet from "helmet";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/usersRouter";
import videoRouter from "./routers/videoRouter";
import bodyParser from "body-parser";
import { localMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";
import flash from "express-flash";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.set("views", process.cwd() + "/src/views");

app.engine("pug", require("pug").__express);
app.use("/tmp", express.static("tmp"));
app.use("/assets", express.static("assets"));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 36000,
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

app.use(localMiddleware);
app.use(flash());

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
