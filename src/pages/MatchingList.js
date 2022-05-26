import React, { useState, useEffect } from 'react';
import './MatchingList.css'
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import axios from 'axios';
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

// const matchSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//         t_name: "no",
//         curri: "no",
//         face : e.target.face.value,
//         area : e.target.area.value,
//         day : e.target.day.value,
//         time : e.target.time.value,
//         free : e.target.pay.value,
//     }

//     axios.post("http://localhost:5000/select_t/matchinglist", data)
//     .then(function(response){
//       console.log(response);
//       if(response.data.success){
//         alert("강사 매칭을 성공하였습니다.");
//       }
//     }).catch(function(error){
//       alert("강사 매칭 실패!" + error);
//     });
// }

function ListItem({ select_id, face, area, day, time, free }) {
    if (free === "무료")
    {
        return (
            // <form onSubmit={matchSubmit}>
            <div style={{ textDecoration: 'none', color: 'black'}}>
                <div className="list-item">
                    <div className="t_id">{select_id}</div>
                    <Button className="curriculum" size="small">커리큘럼</Button>
                    <div className="face">{face}</div>
                    <div className="area">{area}</div>
                    <div className="day">{day}</div>
                    <div className="time">{time}</div>
                    <div className="free">{free}</div>
                    <Button className="button" size="small" onClick={() => alert("매칭이 완료되었습니다.")} href="/matchingcomplete" type="submit">선택</Button>
                </div>
            </div>
            // </form>
        )
    }
    if (free==="유료") {
        return (
            // <form onSubmit={matchSubmit}>
            <div style={{ textDecoration: 'none', color: 'black'}}>
                <div className="list-item">
                    <div className="t_id">{select_id}</div>
                    <Button className="curriculum" size="small">커리큘럼</Button>
                    <div className="face">{face}</div>
                    <div className="area">{area}</div>
                    <div className="day">{day}</div>
                    <div className="time">{time}</div>
                    <div className="free">{free}</div>
                    <Button className="button" size="small" onClick={() => alert("결제창으로 넘어갑니다.")} href="/payment" type="submit">선택</Button>
                </div>
            </div>
            // </form>
        )
    }
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
                    <span>강사번호</span>
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
                        ({ select_id, t_id, title, face, area, day, time, free }) => (
                            <ListItem
                                select_id={select_id}
                                t_id={t_id}
                                title={title}
                                face={face}
                                area={area}
                                day={day}
                                time={time}
                                free={free}
                                key={select_id}
                            />
                        )
                    )}
                </section>
            </main>
        </div>
    );
}