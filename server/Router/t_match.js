const express = require("express");
const router = express.Router();
const database = require("../database");

// 강사 매칭 조건 설정 (TimeTable이용)
router.post("/timetable", (req, res) => {
    database.query(
        "INSERT INTO t_match(t_id, title, face, area, day, time, free) values (?, ?, ?, ?, ?, ?, ?)", [req.body.t_id, req.body.title ,req.body.face, req.body.area, req.body.day, req.body.time, req.body.free],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("새로운 매칭 조건 설정");
        }
    });
});

// 강사 목록 조회 성공
router.get('/matchinglist', (req,res) => {
    database.query('SELECT t.select_id, u.face, u.area, u.day, u.time, u.free FROM (SELECT face, area, day, time, free FROM u_match ORDER BY id DESC LIMIT 1) u JOIN t_match t ON u.face = t.face AND u.area = t.area AND u.day = t.day AND u.time = t.time AND u.free = t.free;', (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("강사 목록 조회");
        }
    })
})


module.exports = router;

