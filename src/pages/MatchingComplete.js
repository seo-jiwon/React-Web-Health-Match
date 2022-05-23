import * as React from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import './MatchingComplete.css'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <main className="main">
          <h2>매칭완료 내역:)</h2>
            <div className="square">
                <div className="content">대면)</div>
                <div className="content">지역) </div>
                <div className="content">요일)</div>
                <div className="content">시간)</div>
                <div className="freeTitle">유무료)</div>

            <Box className="box">
                <Button href="/" color="primary" size="small">홈으로</Button>
            </Box>
            </div>
            </main>
    </div>
  );
}
