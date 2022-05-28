const express = require("express");
const router = express.Router();
const database = require("../database");

//커리큘럼 등록
router.post("/curriculum", (req, res) => {
    database.query(
        "INSERT INTO curriculum(content) values (?)", [ req.body.content ],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("새로운 커리큘럼 등록");
        }
    });
});

router.get('/curriculumdetail', (req,res) => {
    database.query('SELECT content FROM curriculum ORDER BY curriculum_id DESC LIMIT 1;', (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("커리큘럼 조회 성공!");
        }
    })
})

module.exports = router;