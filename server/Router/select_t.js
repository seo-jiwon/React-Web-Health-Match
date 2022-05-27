const express = require("express");
const router = express.Router();
const database = require("../database");

// 강사 사용자 매칭 조건 설정 
router.post("/matchinglist", (req, res) => {
    database.query(
        "INSERT INTO select_t(select_id, t_name, curri, face, area, day, time, free) values (?, ?, ?, ?, ?, ?, ?, ?)", [req.body.select_id, req.body.t_name, req.body.curri ,req.body.face, req.body.area, req.body.day, req.body.time, req.body.free],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("강사 매칭 완료");
        }
    });
});

// 매칭완료내역 조회
router.get('/matchingcomplete', (req,res) => {
    database.query('SELECT face, area, day, time, free FROM select_t ORDER BY select_id DESC LIMIT 1;', (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("매칭 완료 내역 조회 성공!");
        }
    })
})

module.exports = router;