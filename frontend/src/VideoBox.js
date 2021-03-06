import React from 'react';
import './VideoBox.css';
import { Link } from 'react-router-dom';
import {PlayCircleOutlined} from '@ant-design/icons'

export default function VideoBox({id, title, description}) {
    return (
        <Link className="videoBoxLink" to={`/player/${id}`}>
            <div className = 'videoBox'>  
                <PlayCircleOutlined className='playCircle'/>
                <div className="videoText">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    )
}
