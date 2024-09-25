const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRoute = require("./Routes/ownerRouter");
const productsRoute = require("./Routes/productRouter");
const usersRoute = require("./Routes/userRouter");
const expressSession = require("express-session");
const flash = require("connect-flash");
const indexRoute = require("./Routes/indexRouter");
const dataBase = require("./Config/mongoose-connection");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));
app.set("view engine", "ejs");

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
app.use("/", indexRoute);
app.use("/owners", ownersRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);

app.listen(3000);
