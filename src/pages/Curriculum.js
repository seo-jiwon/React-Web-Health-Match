import * as React from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Curriculum.css';
import Footer from './Footer';

export default function Curriculum() {

  const navigate = useNavigate();

  const curriculumSubmit = (e) => {
    e.preventDefault();
    const data = {
      content : e.target.curriculum.value,
    }
  
    axios.post("http://localhost:5000/curriculum/curriculum", data)
    .then(function(response){
      console.log(response);
      if(response.data.success){
        alert("커리큘럼 등록이 완료되었습니다.");
        navigate('/');
      }
    }).catch(function(error){
      alert("커리큘럼 등록 실패!" + error);
    });
  }
  
  return (
    <div>
      <Navbar/>
      <div className="main">
        <div className="curri_inner">
          <div className="curri_cont">
            <div>
              <h2>커리큘럼 작성:)</h2>
            </div>
            {/* <Box style={{ padding:'15px' }}> */}
            <Box>
              <Container>
                  <form onSubmit={curriculumSubmit}>
                  <Stack spacing={2}>
                    <TextField className="curri_textfield" color="primary" fullWidth id="curriculum" name="curriculum" label="커리큘럼 작성" variant="outlined" multiline rows={16} />
                    <Button type="submit">등록완료</Button>
                  </Stack>
                  </form>
              </Container>
            </Box>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
