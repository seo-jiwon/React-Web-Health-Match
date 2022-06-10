import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import './MatchingComplete2.css'

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
        <div style={{ textDecoration: 'none'}}>
          <table className="Table">
          <tr>
            <th className="item">대면</th>
            <td className="content">{face}</td>
          </tr>
          <tr>
            <th className="item">지역</th>
            <td className="content">{area}</td>
          </tr>
          <tr>
            <th className="item">요일</th>
            <td className="content">{day}요일</td>
          </tr>
          <tr>
            <th className="item">시간</th>
            <td className="content">{time}시</td>
          </tr>
          <tr>
            <th className="item">유무료</th>
            <td className="content">{free}</td>
          </tr>
          </table>
        </div>
    )
  }
  return (
    <div>
      <div className="bg" />
      <Navbar/>
      <main className="main">
            <div className="square">
            <h3 className="matchingComplete-text">매칭 완료!</h3>
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
              <Button className="homeButton" href="/" size="small"
                sx={{backgroundColor: '#3c60fa'}}>홈으로</Button>
            </Box>
            </div>
            </main>
    </div>
  );
}
