import React from 'react';
import './style.css'

function CommentDisplay(props) {
    return (
        <div>
            <p id='comments'>{props.statement}</p>
        </div>
    )
}

export default CommentDisplay;