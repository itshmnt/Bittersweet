const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=> {
    console.log("Connected to MongoDB!");
} );

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

/* 
app.get("/", (req,res)=> {
    res.send("Welcome to homepage!!!");
});

app.get("/users", (req,res)=> {
    res.send("Welcome to users page!!!");
});
*/

app.listen(8800, ()=> {
    console.log("Back-end server is running on port 8800!")
});