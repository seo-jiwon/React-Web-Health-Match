import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
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
        <div style={{ textDecoration: 'none', color: 'black'}}>
          <table className="Table">
          <tr>
            <th className="item">항목</th>
            <th className="content">상태</th>
          </tr>
          <tr>
            <td className="item">대면</td>
            <td className="content">{face}</td>
          </tr>
          <tr>
            <td className="item">지역</td>
            <td className="content">{area}</td>
          </tr>
          <tr>
            <td className="item">요일</td>
            <td className="content">{day}요일</td>
          </tr>
          <tr>
            <td className="item">시간</td>
            <td className="content">{time}시</td>
          </tr>
          <tr>
            <td className="item">유무료</td>
            <td className="content">{free}</td>
          </tr>
          </table>
        </div>
    )
  }
  return (
    <div>
      <Navbar/>
      <main className="main">
          <h2>매칭완료 내역:)</h2>
            <div className="square">
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
              <Button href="/" color="primary" size="small">홈으로</Button>
            </Box>
            </div>
            </main>
    </div>
  );
}
