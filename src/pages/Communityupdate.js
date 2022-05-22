import React from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Communityupdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  console.log(data);
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let timeFormat = year + "/" + month + "/" + date;

  const postSubmit = (e) => {
    e.preventDefault();
    const data = {
      post_id : e.target.post_id.value,
      title : e.target.title.value,
      content : e.target.content.value,
      writer : "no",
      write_date : timeFormat
    }

    axios.post("http://localhost:5000/post/update", data)
    .then(function(response){
      console.log(response);
      if(response.data.success){
        alert("게시글 수정에 성공하였습니다.");
        navigate('/community');
      }
    }).catch(function(error){
      alert("게시글 수정 실패!" + error);
    });

  }

  return (
    <Box >
      <Container sx={{ width : '50%'}}>
          <form onSubmit={postSubmit}>
          <Stack spacing={2}>
            <Input type="hidden" name="post_id" id="post_id" value={data.post_id}/>
            <TextField fullWidth defaultValue={data.title} id="title" name="title" label="제목" variant="outlined" />
            <TextField fullWidth defaultValue={data.content} id="content" name="content" label="내용" variant="outlined" multiline rows={4} />
            <Button type="submit">수정완료</Button>
          </Stack>
          </form>
      </Container>
    </Box>
    
  )
}
