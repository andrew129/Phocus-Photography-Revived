import React from 'react';
import './style.css'

export function Input(props) {
    return (
        <div className="form-group">
            <h1 id='statement'>Submit a Comment</h1>
            <input id='title' onChange={props.onChange} className="form-control" placeholder='Enter Title' value={props.title} />
        </div>
    );
}
      
export function TextArea(props) {
    return (
        <div className="form-group">
            <textarea id='message' onChange={props.onChange} className="form-control" placeholder='Enter Message' value={props.message} />
        </div>
    );
}
      
export function FormBtn(props) {
    return (
        <button id='submit' onClick={props.handleSubmit} className="btn btn-primary">Submit
        </button>
    );
}

