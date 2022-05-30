import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './CurriculumDetail.css';



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
        <div>
        <Navbar />
            <main className="main">
            <h2>커리큘럼 :)</h2>
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
        </div>
    );
}