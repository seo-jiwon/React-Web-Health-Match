import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Newpost.css';
import Navbar from './Navbar';
import Footer from './Footer';



export default function Newpost() {
  const navigate = useNavigate();
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let timeFormat = year + "/" + month + "/" + date;

  const postSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
      writer: "no",
      write_date: timeFormat
    }

    axios.post("http://localhost:5000/post/newpost", data)
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          navigate('/community');
        }
      }).catch(function (error) {
        alert("게시글 등록 실패!" + error);
      });

  }

  return (
    <>
      <Navbar />
      <div>
        <Container sx={{ width: '50%' }}>
          <div className="newpost_box">
            <Box>
              <h1>NEWPOST :)</h1>
              <div>
                <Container sx={{ width: 900, height: 500 }}>
                  <form onSubmit={postSubmit}>
                    <Stack spacing={1}>

                      <TextField fullWidth id="title" name="title" label="제목" variant="filled" color="success" />
                      <TextField fullWidth id="content" name="content" label="내용" variant="filled" color="success" multiline rows={16} />

                      <Button type="submit" variant="contained" color="success" >등록완료</Button>

                    </Stack>
                  </form>
                </Container>
              </div>
            </Box>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}
