import './style.css';
import React from 'react';

export function Comments(props) {
    return (
        <div>
            <h3 id='titles'>{props.title}</h3>
            <p id='messages'>{props.message}</p>
        </div>
    )
}

export default Comments;