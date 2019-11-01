import React from 'react'

function ShowCommentBtn(props) {
    return (
        <button type="button" onClick={props.showComments} className="btn btn-transparent">Show Replies</button>
    )
}


export default ShowCommentBtn;