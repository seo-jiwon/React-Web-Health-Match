import React from 'react';
import { Link } from 'react-router-dom';
import './ListItem.css'

function ListItem({ post_id, title, writer, write_date }) {

    return (
        <Link to={{
            pathname:"/detail",
            search:`?board_id=${post_id}`
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

export default ListItem;