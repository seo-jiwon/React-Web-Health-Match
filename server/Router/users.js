const express = require("express");
const router = express.Router();
const database = require("../database");

router.post("/signup", (req, res) => {
    database.query(
        "INSERT INTO users(email, pw, nickname, type) values (?, ?, ?, ?)", [req.body.email, req.body.pw, req.body.nickname, req.body.type],
    function(err, data){
        if(err){
            console.log(err);
            console.log("회원가입 실패")
        } else{
            res.send({success : 1});
            console.log("회원가입 성공")
        }
    });
});

router.post("/signin", (req, res) =>{
    const email = req.body.email;
    const pw = req.body.pw;

    database.query("select * from users where email = ? and pw = ?", [email, pw],
    function(err, data, fields){
        if(!data[0]){
            console.log("로그인 실패, 일치하는 데이터 없음");
            res.send({failure : 1});
        }
        else if(err){
            console.log("에러 발생" + err);
        }
        else {
            console.log("로그인 성공")
            res.send({success : 1});
        }
    });
    // if (email && pw) {
    //     connection.query('SELECT * FROM users WHERE email = ? AND pw = ?', [email, pw], function(error, results, fields) {
    //         if (error) throw error;
    //         if (results.length > 0) {
    //             request.session.nickname = nickname;
    //             response.redirect('/');
    //             response.end();
    //         } else {              
    //             response.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
    //         }            
    //     });
    // } else {        
    //     response.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');    
    //     response.end();
    // }

    //입력된 id 와 동일한 id 가 mysql 에 있는지 확인
    // const sql1 = 'SELECT COUNT(*) AS result FROM users WHERE email = ?'
    // db.query(sql1, email, (err, data) => {
    //     if(!err) {
    //     	// 결과값이 1보다 작다면(동일한 id 가 없다면)
    //         if(data[0].result < 1) {
    //             res.send({ 'msg': '입력하신 id 가 일치하지 않습니다.'})
    //         } else { // 동일한 id 가 있으면 비밀번호 일치 확인
    //             const sql2 = `SELECT 
    //                             CASE (SELECT COUNT(*) FROM users WHERE email = ? AND pw = ?)
    //                                 WHEN '0' THEN NULL
    //                                 ELSE (SELECT email FROM users WHERE email = ? AND pw = ?)
    //                             END AS userId
    //                             , CASE (SELECT COUNT(*) FROM users WHERE email = ? AND pw = ?)
    //                                 WHEN '0' THEN NULL
    //                                 ELSE (SELECT pw FROM users WHERE email = ? AND pw = ?)
    //                             END AS userPw`;
    //             // sql 란에 필요한 parameter 값을 순서대로 기재
    //             const params = [req.body.email, req.body.pw, req.body.email, req.body.pw, req.body.email, req.body.pw, req.body.email, req.body.pw];
    //             db.query(sql2, params, (err, data) => {
    //                 if(!err) {
    //                     res.send(data[0]);
    //                 } else {
    //                     res.send(err);
    //                 }
    //             });
    //         }
    //     } else {
    //         res.send(err);
    //     }
    // });

    
});

router.post("/mypage", (req, res) =>{
    const email = req.body.email;
    const pw = req.body.pw;
    const nickname = req.body.nickname;
    const type = req.body.type;
});
        
module.exports = router;