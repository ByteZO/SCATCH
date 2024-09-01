const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRoute = require("./Routes/ownerRouter");
const productsRoute = require("./Routes/productRouter");
const usersRoute = require("./Routes/userRouter");
const dataBase = require("./Config/mongoose-connection");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/owners", ownersRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);

app.listen(3000);
