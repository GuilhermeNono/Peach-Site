require("dotenv").config();

const {v4: uuidv4} = require("uuid");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const routes = require("./routes/routes");


const oneDay = 1000 * 60 * 60 * 24;

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(sessions({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge:oneDay}
}))
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes)

app.get("/123", (req, res) => {
  console.log(`req.session.token: ${req.session.token}`);
  res.send(req.session.token);
  // res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/123/123", (req, res) => {
  console.log(`req.session.token: ${req.session.user}`);
  res.send(req.session.user);
  // res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(PORT);
console.log(`Server is running at http://localhost:${PORT}`);