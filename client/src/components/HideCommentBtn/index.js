import React from 'react'

function HideCommentBtn(props) {
    return (
        <button  type="button" onClick={props.hideComments} className="btn btn-transparent">Hide Replies</button>
    )
}


export default HideCommentBtn;