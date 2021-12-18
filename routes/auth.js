const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req,res)=> {
    try {
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        // save user and resond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);

    }
});

//Login
router.post("/login", async (req,res)=> {
    try {
        // check for does user exist?
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("User not found!");
        // check for correct password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password!");
        // correct email and password
        res.status(200).json(user);

    } catch(err) {
        res.status(500).json(err);
    }
});


/* 
router.get("/", (req,res)=> {
    res.send("Welcome to auth route!!!");
});
*/

module.exports = router;