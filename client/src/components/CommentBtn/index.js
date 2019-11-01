import './style.css';
import React from 'react';

function CommentBtn(props) {
    return (
        <button type="button" onClick={props.saveComment} className="btn btn-transparent">Reply</button>
    )
}

export default CommentBtn;