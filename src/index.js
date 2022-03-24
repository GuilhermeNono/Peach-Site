require("dotenv").config();

const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const routes = require("./routes/routes");
const url = require("url");
const {userResquest} = require("./routes/discordAuthRoutes");



const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(PORT);
console.log(`Server is running at http://localhost:${PORT}`);