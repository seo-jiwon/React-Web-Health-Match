import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './Detail.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import Comment from './Comment'
import Footer from './Footer';


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

function deletepost(id) {
    const data = {
        post_id : id
    }

    console.log(data)

    axios.post("http://localhost:5000/post/delete", data)
    .then(function(response){
      console.log(response);
      if(response.data.success){
        window.location.replace('/community');
      }
    }).catch(function(error){
      alert("게시글 삭제 실패!" + error);
    });
}

function onUpdate(data){
    return 
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
                <div classNmae="main">
                    <div className='detail_inner'>
                        <div className='detail_cont'>
                            <table className="table">
                                <tr className="detail_header">
                                    <th className="detail_title">{data.title}</th>
                                    <th className="detail_date">작성일 {data.write_date}</th>
                                    <th className="detail_writer">작성자 {data.writer}</th>
                                </tr>
                                <tr height="350px">
                                    <td className="td" colSpan="6">{data.content}</td>
                                </tr>
                            </table>
                            <div className='btns'>
                                <Link to='/update' state = {{data : data}}>
                                    <Button sx={{marginRight:2}} className="btn" variant="outlined" startIcon={<AutorenewOutlinedIcon />}>UPDATE</Button>
                                </Link>
                                <Button className="btn" variant="outlined" onClick={() => deletepost(id)} startIcon={<DeleteIcon />}>Delete</Button>
                            </div>
                            <Comment post_id={id}/>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
        )
    }
}

export default Detail;