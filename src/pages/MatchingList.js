import React, { useState, useEffect } from 'react';
import './MatchingList.css'
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

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

function ListItem({ t_id, title, face, area, day, time, free }) {

    return (
        <div style={{ textDecoration: 'none', color: 'black'}}>
            <div className="list-item">
                <div className="t_id">강사명</div>
                <div className="curriculum">커리큘럼</div>
                <div className="face">{face}</div>
                <div className="area">{area}</div>
                <div className="day">{day}</div>
                <div className="time">{time}</div>
                <div className="free">{free}</div>
                <Button className="button" size="small" href="/matchingcomplete">선택</Button>
            </div>
        </div>
    )
}

export default function MatchingList() {
    
    const data = useFetch('http://localhost:5000/t_match/matchinglist');

    return(
        <div>
            <Navbar />
            <main className="list-template">
                <div className="list-title">
                    강사목록 :)
                </div>
                <section className="head-wrapper">
                    <span>강사명</span>
                    <span className="title-column">커리큘럼</span>
                    <span>대면</span>
                    <span>지역</span>
                    <span>요일</span>
                    <span>시간</span>
                    <span>유무료</span>
                    <span>선택</span>
                </section>
                <section className="list-wrapper">
                    {data.map(
                        ({ t_id, title, face, area, day, time, free }) => (
                            <ListItem
                                t_id={t_id}
                                title={title}
                                face={face}
                                area={area}
                                day={day}
                                time={time}
                                free={free}
                            />
                        )
                    )}
                </section>
            </main>
        </div>
    );
}