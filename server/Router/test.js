const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ text : "hi" });
    console.log("hi 실행");
})

module.exports = router;