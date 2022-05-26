const express = require("express");
const router = express.Router();
const database = require("../database");

// 강사 사용자 매칭 조건 설정 
router.post("/matchinglist", (req, res) => {
    database.query(
        "INSERT INTO select_match(t_name, curri, face, area, day, time, free) values (?, ?, ?, ?, ?, ?, ?)", [req.body.t_name, req.body.curri ,req.body.face, req.body.area, req.body.day, req.body.time, req.body.free],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("강사 매칭 완료");
        }
    });
});

module.exports = router;
