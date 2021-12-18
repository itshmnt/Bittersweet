const router = require("express").Router();

router.get("/", (req,res)=> {
    res.send("Welcome to users route!!!");
});

module.exports = router;