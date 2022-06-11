import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import './MatchingComplete.css'



export default function Home() {
  const data = useFetch('http://localhost:5000/select_t/matchingcomplete');
  
  function useFetch(url) {

    const [data, setData] = useState([]);
  
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
  
        setData(json);
    }
  
    useEffect(() => {
        fetchUrl();
    }, []);
    return data;
  }
  
  function ListItem({ face, area, day, time, free }) {
    return (
        <div className="basic_table">
          <table className="Table">
            <tr className="item">
              <th>대면</th>
              <th>지역</th>
              <th>요일</th>
              <th>시간</th> 
              <th>유무료</th>
            </tr>
            <tr>
              <td>{face}</td>
              <td>{area}</td>
              <td>{day}요일</td>
              <td>{time}시</td><td>{free}</td>
            </tr>
          </table>
        </div>
    )
  }
  return (
    <div>
      <Navbar/>
      <main className="main">
          <div className="inner">
            <div className="cont">
              <div>
                <h2 className="h2_line">매칭완료 :)</h2>
              </div>
              {data.map(
                ({ face, area, day, time, free }) => (
                  <ListItem
                      face={face}
                      area={area}
                      day={day}
                      time={time}
                      free={free}
                  />
                  )
                )}
              <Box className="box">
                <Button href="/" >홈으로</Button>
              </Box>
            </div>
          </div>
        </main>
      <Footer/>
    </div>
  );
}

