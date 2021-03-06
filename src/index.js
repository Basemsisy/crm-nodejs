// essential
const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crmRouter = require("./crm/routes");
const jsonwebtoken = require("jsonwebtoken");

// db connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/crmDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

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
