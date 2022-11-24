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
      <div className="matchingcomplete_basic_table">
        <table className="matchingcomplete_Table">
          <tr className="matchingcomplete_item">
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
    <body className="body">
      <div className="footer_fix">
        <Navbar />
        <div className="main">
          <div className="curri_inner">
            <div className="curri_cont">
              <div>
                <h2 className="matchingcomplete_h2_line">매칭완료 :)</h2>
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
              <Box className="matchingcomplete_box">
                <Button color="primary" href="/" >홈으로</Button>
              </Box>

            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </body>
  );
}

