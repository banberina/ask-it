import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

let config;
if (!process.env.HEROKU) {
  config = require("./config");
} else {
  config = process.env;
}
