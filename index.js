require("dotenv").config();

const express = require('express');
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "/public" )));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(PORT);
console.log(`Server is running at http://localhost:${PORT}`);