const express = require("express");
const router = express.Router();
const database = require("../database");

// 새 게시글 작성
router.post("/newpost", (req, res) => {
    database.query(
        "INSERT INTO post(writer, title, content, write_date ) values (?, ?, ?, ?)", [req.body.writer, req.body.title, req.body.content, req.body.write_date ],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("새로운 게시글 등록");
        }
    });
});

// 게시판 목록 조회
router.get('/community', (req,res) => {
    database.query('SELECT post_id, title, writer, write_date FROM post', (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("게시글 목록 조회 성공!");
        }
    })
})

// 상세 글 조회
router.get('/detail', (req, res) => {
    database.query('SELECT * FROM post WHERE post_id=?', [req.query.post_id], (err, result) => {
        if (err) res.send(err);
        else {
            res.send(result);
            console.log("상세 글 조회");
        }
    })
})

// 게시글 수정 
router.post('/update', (req, res) => {
    database.query(
        "UPDATE post SET title = ?, content = ?, write_date = ? where post_id = ? ", [req.body.title, req.body.content, req.body.write_date, req.body.post_id ],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("게시글 수정 성공");
        }
    });
});

// 게시글 삭제
    router.post("/delete", (req, res) => {
        database.query(
            "DELETE FROM post where post_id = ?", [req.body.post_id],
        function(err, data){
            if(err){
                console.log(err);
            } else{
                res.send({success : 1});
                console.log("게시글 삭제");
            }
        });
    });
        
module.exports = router;