const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

let config;
if (!process.env.HEROKU) {
  config = require("./config");
}

// Routes
const apiQuestions = require("./routes/questions");
const apiUsers = require("./routes/users");
const apiAuth = require("./routes/auth");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MONGODB_URL || config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    'useFindAndModify': false
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err)); // connect server to mongodb

app.use("/questions", apiQuestions);
app.use("/users", apiUsers);
app.use("/auth", apiAuth);


app.use("/", express.static("./../client/build"));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(port, () => console.log(`AskIt listening on port ${port}!`));
