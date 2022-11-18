const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set("views", __dirname + "/../" + "views");
app.set("view engine", "pug");

//Midlleware function to serve static files such as images or css
app.use(express.static(__dirname + "/../" + "/public"));

//Connect to DB
//If you want to save the URI into .env file uncomment the following:
// const dotenv = require("dotenv").config();

const connectDB = require("./db");
connectDB();

//Route variables
const watchList = require("./routes/watchList");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Main",
    heading: "Welcome to this page built with Pug templates!",
  });
});

app.get("/about", (req, res) => {
  res.render("page", {
    title: "About",
    heading: "About Page",
    subheading: "Sub-Heading #1",
  });
});

app.use("/WatchList", watchList);

app.listen(port, () => {
  console.log(`${__dirname}`);
  console.log(`listening on port http://localhost:${port}`);
});
