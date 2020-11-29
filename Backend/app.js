const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
require('dotenv').config()
const userRoutes = require("./routes/user");

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

//app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

app.all('*', function (req, res) {
  return res.status(404).json({ error : "Erreur d'URL : " + req.url })
});

module.exports = app;