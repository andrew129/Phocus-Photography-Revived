import React from 'react';

function DeleteBtn(props) {
    return (
        <button type="button" onClick={props.deleteTopic} className="btn btn-transparent">Delete Topic</button>
    )
}


export default DeleteBtn