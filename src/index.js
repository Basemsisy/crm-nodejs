// essential
const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crmRouter = require("./crm/routes");

// db connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/crmDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
crmRouter(app);

app.get("/", (req, res) => {
  res.status(200).send("welcome in my first node app");
});

// server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app working on port: ${PORT} `);
});
