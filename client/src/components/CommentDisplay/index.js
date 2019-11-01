import React from 'react';

function CommentDisplay(props) {
    return (
        <div>
            <p id='comments'>{props.statement}</p>
        </div>
    )
}

export default CommentDisplay;