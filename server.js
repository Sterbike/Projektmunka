require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors")
const express = require("express");
const bcrypt = require('bcrypt');
const User = require('./models/user');
const app = express();
const PORT = process.env.PORT || 3500;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Successful database connection!"))
    .catch((error) => console.log(error.message));

//SERVER LISTENING//
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
