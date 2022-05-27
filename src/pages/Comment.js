import React from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography, Stack } from '@mui/material';
import axios from 'axios';
import { CommentsDisabledOutlined } from '@mui/icons-material';






export default function Comment() {
    
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let timeFormat = year + "/" + month + "/" + date;
    
    const onComment = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/post/comment", {
            post_id:2,
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
                    alert("댓글이 성공적으로 작성되었습니다.")
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
       await axios.post("http://localhost:5000/post/comment_success", {post_id:2}, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(response){
        console.log(response);
        setComments(
            response.data.map((row) =>(
                <Card key={row.comment_id} variant="outlined" sx={{width:"100%",marginTop:10}}>
                    <Typography>{row.comment_writer}</Typography>
                    <Stack direction="row" spacing={2}>
                        <Typography>{row.contents}</Typography>
                        <Button variant="outlined" sx={{width:"10%", align:"right"}}>삭제</Button>
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

    function deletecomment(id) {
        const data = {
            comment_id :id
        }
    
        console.log(data)
    
        axios.post("http://localhost:5000/post/comment_delete", data)
        .then(function(response){
          console.log(response);
          if(response.data.success){
            alert("댓글 삭제가 성공하였습니다.");
            window.location.replace('/detail');
          }
        }).catch(function(error){
          alert("댓글 삭제 실패!" + error);
        });
    }
    
    return (
    <div>
        <Card variant="outlined" sx={{width:"100%",marginTop:10}}>
            <form onSubmit={onComment}>
            <TextField id="contents" name="contents" label="댓글을 입력하세요..." variant="standard" sx={{width:"90%"}}/>
            <Button variant="outlined" type="submit" sx={{width:"10%"}}>완료</Button>
            </form>
        </Card>
        {comments}
        
    </div>
  )
}



