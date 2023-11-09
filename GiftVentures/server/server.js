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


//REGISTRATION//
app.post("/register", async (req, res) => {
    const { username, FirstName, SecondName, password, role, email, mobile, birthdate } = req.body;

    try {
        const checkUsername = await User.findOne({ username });
        const checkEmail = await User.findOne({ email });
        if (checkUsername) {
            res.json("username exists");
        }
        else if(checkEmail) {
            res.json("email exists")
        } 
        else {

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                username,
                FirstName,
                SecondName,
                password: hashedPassword,
                email,
                mobile,
                birthdate,
                role,
            });
            await newUser.save();
            res.json("notexists");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("error"); // Send an error response
    }
});

//LOGIN//

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json("notfound");
            console.log("Notfound")
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(401).json("incorrect");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured" });
        console.log("error")

    }
});

// UPDATING A USER //
app.put("/updateUser/:username", async (req, res) => {
    const { username } = req.params;
    const updatedUser = req.body;
  
    try {

      if (updatedUser.password) {
        const hashedPassword = await bcrypt.hash(updatedUser.password, 10);
        updatedUser.password = hashedPassword;
      }

      const savedUser = await User.findOneAndUpdate(
        { username },
        updatedUser,
        { new: true }
      );
  
      if (!savedUser) {
        return res.status(404).json({ error: "User does not exist" });
      }
  
      res.status(200).json(savedUser);
    } catch (error) {
      console.error("Error while updating the user:", error);
      res.status(500).json({ error: "An error occured" });
    }
  });
