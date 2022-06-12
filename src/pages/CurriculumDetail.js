import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './CurriculumDetail.css';
import Footer from './Footer';
import Box from '@mui/material/Box';



export default function Home() {
    const data = useFetch('http://localhost:5000/curriculum/curriculumdetail');
    
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
    
    function Item({ content }) {
        return (
            <div>{content}</div>
        )
    }
    return (
        <body className="body">
        <div className="footer_fix">
          <Navbar/>
          <div className="main">
            <div className="curri_inner">
              <div className="curri_cont">
                <div>
                  <h2>커리큘럼:)</h2>
                </div>
        <Box>
         <main className="main">
                <div className="curriContent">
                    {data.map(
                        ({ content }) => (
                            <Item
                                content={content}
                            />
                        )
                    )}
                </div>
            </main>
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
