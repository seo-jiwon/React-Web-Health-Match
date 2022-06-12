import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './MatchingList.css'
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import axios from 'axios';
import Footer from './Footer';

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



export default function MatchingList() {
    
    const data = useFetch('http://localhost:5000/t_match/matchinglist');

    const navigate = useNavigate();

    const { register, handleSubmit, errors} = useForm();

    const onValid = (data) => {
        const {face, area, day, time, free} = data;
        axios.post("http://localhost:5000/select_t/matchinglist", {face, area, day, time, free})
        .then(response => {
            console.log(response.data, "onvalid");
            if (free === "무료") navigate('/matchingcomplete');
            if (free === "유료") navigate('/payment');
        })
        .catch(error => {
            console.log(error.data, "onInvalid");
            alert("강사 매칭을 실패하였습니다.");
        });
    };

    function ListItem({ select_id, face, area, day, time, free }) {

        if (free === "무료")
        {
            return (
                <form onSubmit={handleSubmit(onValid)}>
                    <div style={{ textDecoration: 'none', color: 'black'}}>
                        <div className="list-item">
                            <div className="t_id">{select_id}</div>
                            <Button className="curriculum" size="small" href="/curriculumdetail">커리큘럼</Button>
                            <input className="face" value={face} {...register("face")}></input>
                            <input className="area" value={area} {...register("area")}></input>
                            <input className="day" value={day} {...register("day")}></input>
                            <input className="time" value={time} {...register("time")}></input>
                            <input className="free" value={free} {...register("free")}></input>
                            <Button className="button" size="small" type="submit">선택</Button>
                        </div>
                    </div>
                </form>
            )
        }
        if (free==="유료") {
            return (
                <form onSubmit={handleSubmit(onValid)}>
                    <div style={{ textDecoration: 'none', color: 'black'}}>
                        <div className="list-item">
                            <div className="t_id">{select_id}</div>
                            <Button className="curriculum" size="small" href="/curriculumdetail">커리큘럼</Button>
                            <input className="face" value={face} {...register("face")}></input>
                            <input className="area" value={area} {...register("area")}></input>
                            <input className="day" value={day} {...register("day")}></input>
                            <input className="time" value={time} {...register("time")}></input>
                            <input className="free" value={free} {...register("free")}></input>
                            <Button className="button" size="small" type="submit">선택</Button>
                        </div>
                    </div>
                </form>
            )
        }
    }

    return(
        <body className="body">
            <div className="footer_fix">
                <Navbar />
                <div classNmae="main">
                    <div className='detail_inner'>
                        <div className='detail_cont'>
                            <main className="matching-list-template">
                                <div className="matching-list-title">
                                    강사목록 :)
                                </div>
                                <section className="matching-head-wrapper">
                                    <span>강사번호</span>
                                    <span className="matching-title-column">커리큘럼</span>
                                    <span>대면</span>
                                    <span>지역</span>
                                    <span>요일</span>
                                    <span>시간</span>
                                    <span>유무료</span>
                                    <span>선택</span>
                                </section>
                                <section className="matching-list-wrapper">
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
                    </div>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </body>
    );
}