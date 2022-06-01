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
            console.log("게시글 목록 조회");
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
            console.log("게시글 수정");
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

// 댓글 생성
router.post("/comment", (req, res) => {
    database.query(
        "INSERT INTO comments(post_id,comment_writer, contents, comment_date ) values (?, ?, ?, ?)", [req.body.post_id,req.body.comment_writer, req.body.contents, req.body.comment_date ],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("새로운 댓글 등록");
        }
    });
});

router.post('/comment_success', (req,res) => {
    database.query('SELECT * FROM comments WHERE post_id=?',[req.body.post_id], 
    (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("댓글 조회");
        }
    })
})

//댓글 삭제
router.post("/comment_delete", (req, res) => {
    database.query(
        "DELETE FROM comments where comment_id = ?", [req.body.comment_id],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("댓글 삭제");
        }
    });
});

        
module.exports = router;