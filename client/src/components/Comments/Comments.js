import React from 'react';
import './style.css';

const Comments = props => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.message}</p>
        </div>
    )
}

export default Comments;