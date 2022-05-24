import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import './MatchingComplete.css'

// function useFetch(url) {

//   const [data, setData] = useState([]);

//   async function fetchUrl() {
//       const response = await fetch(url);
//       const json = await response.json();

//       setData(json);
//   }

//   useEffect(() => {
//       fetchUrl();
//   }, []);
//   return data;
// }

// function ListItem({ face, area, day, time, free }) {

//   return (
//       <div style={{ textDecoration: 'none', color: 'black'}}>
//           <div className="list-item">
//             <div className="content">대면) {face}</div>
//             <div className="content">지역) {area}</div>
//             <div className="content">요일) {day}</div>
//             <div className="content">시간) {time}</div>
//             <div className="freeTitle">유무료) {free}</div>
//             <Button className="button" size="small" onClick={() => alert("매칭이 완료되었습니다.")} href="/matchingcomplete">선택</Button>
//           </div>
//       </div>
//   )
// }

export default function Home() {
  //const data = useFetch('http://localhost:5000/t_match/matchingcomplete');

  return (
    <div>
      <Navbar/>
      <main className="main">
          <h2>매칭완료 내역:)</h2>
            <div className="square">
              <div className="content">대면) </div>
              <div className="content">지역) </div>
              <div className="content">요일) </div>
              <div className="content">시간) </div>
              <div className="freeTitle">유무료) </div>
              {/* {data.map(
                      ({ face, area, day, time, free }) => (
                          <ListItem
                              face={face}
                              area={area}
                              day={day}
                              time={time}
                              free={free}
                          />
                      )
                  )} */}
            <Box className="box">
                <Button href="/" color="primary" size="small">홈으로</Button>
            </Box>
            </div>
            </main>
    </div>
  );
}
