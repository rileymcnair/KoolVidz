import React from 'react';
import './VideoBox.css';
import { Link } from 'react-router-dom';

export default function VideoBox({id, title, description}) {
    return (
        <div className = 'videoBox'>
            <h1>
                {title}
            </h1>
            <p>
                {description}
            </p>
            <Link to={`/player/${id}`}>
                <h1>click here to play</h1>
            </Link>

        </div>
    )
}
