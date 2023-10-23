const mongoose = require('mongoose');
const express = require("express");
const dotenv = require("dotenv");
const userSchema = require("./modules/user.js")
const port = 8000
const app = express()
dotenv.config()

// Parse JSON request bodies
app.use(express.json());

async function main() {
    try {
        await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

app.post("/user", async (req, res) => {
    const userBody = req.body;
    try {
        const newUser = new userSchema({ ...userBody });
        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send(error.message);
    }

});

main().then(() => {
    app.listen(port, () => {
        console.log('Server is running on port ' + port);
    });
}).catch(err => console.log(err));
