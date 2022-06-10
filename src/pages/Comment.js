import React from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography, Stack } from '@mui/material';
import axios from 'axios';
import { CommentsDisabledOutlined } from '@mui/icons-material';
import { useSearchParams} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import './Comment.css';


export default function Comment(post_id) {
    
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let timeFormat = year + "/" + month + "/" + date;
    
    const onComment = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/post/comment", {
            post_id: post_id.post_id,
            comment_writer:"강채연",
            contents: e.target.contents.value,
            comment_date : timeFormat
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if(response.data.success){
                    getComment()
                }
            })
            .catch((error) => {
                console.log(error);
                alert("댓글 작성 실패!" + error);
            })
            
    }

    const [comments, setComments] = React.useState();
    

    async function getComment(){
       await axios.post("http://localhost:5000/post/comment_success", {post_id:post_id.post_id}, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(response){
        console.log(response);
        setComments(
            response.data.map((row) =>(
                <Card key={row.comment_id} variant="outlined" sx={{width:"100%",marginTop:2}}>
                    <Typography>{row.comment_writer}</Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>{row.contents}</Typography>
                        <Button  size="small" onClick={() => deletecomment(row.comment_id)}>삭제</Button>
                    </Stack>
                </Card>
            ))
        )
        
    }).catch(function(error){
      alert("댓글 조회 실패!" + error);
    });

    }

    React.useEffect(() => {
        getComment()
    }, [])


    function deletecomment(c_id) {
        const data = {
            comment_id :c_id
        }
    
        console.log(data)
    
        axios.post("http://localhost:5000/post/comment_delete", data)
        .then(function(response){
          console.log(response);
          if(response.data.success){
            getComment();

          }
        }).catch(function(error){
          alert("댓글 삭제 실패!" + error);
        });
    }
    
    return (
    <div>
        <div className="comment_title">
            <h3 >댓글</h3>
        </div>
        <Card variant="outlined" sx={{width:"100%"}}>
            <form onSubmit={onComment}>
            <TextField id="contents" name="contents" label="댓글을 입력하세요..." variant="standard" sx={{width:"90%"}}/>
            <Button variant="outlined"  type="submit" sx={{width:"10%"}}>완료</Button>
            </form>
        </Card>
        {comments}
    </div>
  )
}



