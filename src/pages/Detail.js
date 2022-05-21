import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './Detail.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

function useFetch(url, id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        await axios.get(`${url}?post_id=${id}`).then(res => {
            setData(res.data[0]);
            console.log(data);
        });
        setLoading(false);
    }

    useEffect(() => {
        if (id) {
            console.log("id: " + id);
            fetchUrl();
        } else {
            console.log("no data");
            setData(null);
            setLoading(false);
        }
    }, []);

    return [data, loading];
}

const Detail = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('post_id');

    const [data, loading] = useFetch('http://localhost:5000/post/detail', id);

    if (loading) {
        return (
            <div>loading..</div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <div className='Post'>
                    <div className='read_title'>
                        {data.title}
                    </div>
                    <table className="table">
                        <tbody>
                            <tr align="center" className='table_info'>
                                <td className="td" width="15%">제목</td>
                                <td className="td" width="20%">{data.title}</td>
                                <td className="td" width="15%">작성일</td>
                                <td className="td" width="20%">{data.write_date}</td>
                                <td className="td" width="15%">작성자</td>
                                <td className="td" width="15%">{data.writer}</td>
                            </tr>
                            <tr height="350px">
                                <td className="td" colSpan="6">{data.content}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='btns'>
                        <Button className="btn" variant="outlined" startIcon={<AutorenewOutlinedIcon />}>UPDATE</Button>
                        <Button className="btn" variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Detail;