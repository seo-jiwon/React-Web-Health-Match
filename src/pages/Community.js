import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Community.css'
import Navbar from './Navbar';
import Button from '@mui/material/Button';
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

function ListItem({ post_id, title, writer, write_date }) {

    return (
        <Link to={{
            pathname:"/detail",
            search:`?post_id=${post_id}`
        }} style={{ textDecoration: 'none', color: 'black'}}>
            <div className="list-item">
                <div className="post_id">{post_id}</div>
                <div className="title">{title}</div>
                <div className="writer">{writer}</div>
                <div className="write_date">{write_date}</div>
            </div>
        </Link>
    )
}

function Community() {

    const data = useFetch('http://localhost:5000/post/community');

    return (
        <body className="body">
            <div className="footer_fix">
                <Navbar />
                <div className="main">
                    <div className='detail_inner'>
                        <div className='detail_cont'>
                            <main className="list-template">
                                <div className="list-title">
                                    게시판 :)
                                    <Button className="button" sx={{ fontWeight: 'bold'}} href="/newpost">new post</Button>
                                </div>
                                <section className="head-wrapper">
                                    <span>#</span>
                                    <span className="title-column">제목</span>
                                    <span>작성자</span>
                                    <span>작성일</span>
                                </section>
                                <section className="list-wrapper">
                                    {data.map(
                                        ({ post_id, title, writer, write_date }) => (
                                            <ListItem
                                                post_id={post_id}
                                                title={title}
                                                writer={writer}
                                                write_date={write_date}
                                                key={post_id}
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

export default Community;