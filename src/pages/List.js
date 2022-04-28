import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import './List.css'
import Navbar from './Navbar';
import Button from '@mui/material/Button';

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

function List() {

    const data = useFetch('http://localhost:5000/post/list');

    return (
        <div>
            <Navbar />
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
    );
}

export default List;