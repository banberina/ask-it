const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

// Routes
const apiQuestions = require("./routes/questions");
const apiUsers = require("./routes/users");
const apiAuth = require("./routes/auth");

let config;
if (!process.env.HEROKU) {
  config = require("./config");
}

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

/* Global middleware */
/* app.use((req, res, next) => {
  console.log("Server time: ", Date.now());
  next();
});

app.post("/registration", (req, res) => {
  let model = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  db.user.findOne({ email: model.email }, (error, docs) => {
    if (error) throw error;
    if (docs) {
      console.log(getDate(), "Duplicate email error for ", model.email);
      res.status(406);
      res.send({ response: "FAIL", reason: "email" });
    } else {
      db.user.findOne({ username: model.username }, (error, docs) => {
        if (error) throw error;
        if (docs) {
          console.log(
            getDate(),
            "Duplicate username error for ",
            model.username
          );
          res.status(406);
          res.send({ response: "FAIL", reason: "username" });
        } else {
          db.user.insertOne(model, (error, docs) => {
            console.log(getDate(), "New user registered : ", model.username);
            res.status(200);
            res.send({ response: "OK" });
          });
        }
      });
    }
  });
});

app.post("/authenticate", (req, res) => {
  let model = req.body;
  db.user.findOne(
    { $and: [{ username: model.username }, { password: model.password }] },
    (error, docs) => {
      if (error) {
        console.log(
          getDate(),
          "Error logging in for ",
          model.username,
          "ERROR : ",
          error
        );
        throw error;
      }
      if (docs) {
        let token = jwt.sign(
          {
            username: req.body.username,
            type: docs.type,
            exp: Math.floor(Date.now() / 1000) + 3600,
          },
          process.env.JWT_SECRET || config.JWT_SECRET
        );
        console.log(getDate(), "New logging by : ", docs.username);
        res.status(200);
        res.send({
          response: "OK",
          jwt: token,
          user: docs.username,
          type: docs.type,
        });
      } else {
        res.status(401);
        res.send({ response: "FAIL", reason: "invalid" });
      }
    }
  );
});

const addLog = (username, action, timestamp) => {
  db.logs.insert({
    username: username,
    action: action,
    timestamp: Date.now(),
  });
};

*/
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
