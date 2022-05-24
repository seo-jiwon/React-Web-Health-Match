const express = require("express");
const router = express.Router();
const database = require("../database");

// 강사 사용자 매칭 조건 설정 
router.post("/timetable", (req, res) => {
    database.query(
        "INSERT INTO t_match(t_id, title, face, area, day, time, free) values (?, ?, ?, ?, ?, ?, ?)", [req.body.t_id, req.body.title ,req.body.face, req.body.area, req.body.day, req.body.time, req.body.free],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("새로운 매칭 조건 설정 완료");
        }
    });
});

// 강사 목록 조회 성공
router.get('/matchinglist', (req,res) => {
    database.query('select t.face, t.area, t.day, t.time, t.free from t_match t, u_match u where t.face=u.face and t.area=u.area and t.day=u.day and t.time=u.time and t.free=u.free order by id desc limit 1', (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("강사 목록 조회 성공!");
        }
    })
})


module.exports = router;

