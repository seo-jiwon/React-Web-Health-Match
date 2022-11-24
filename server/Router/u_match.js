const express = require("express");
const router = express.Router();
const database = require("../database");

// 일반인 사용자 매칭 조건 설정 
router.post("/matching", (req, res) => {
    database.query(
        "INSERT INTO u_match(id, face, area, day, time, free) values (?, ?, ?, ?, ?, ?)", [req.body.id, req.body.face, req.body.area, req.body.day, req.body.time, req.body.free],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("새로운 매칭 조건 설정");
        }
    });
});

module.exports = router;