import React from 'react';
import './style.css'

export function Input(props) {
    return (
        <div className="form-group input text-center">
            <h1 style={{marginBottom: 50}} id='statement'>Start a Discussion</h1>
            <input id='title' name="title" onChange={props.handleChange} className="form-control" placeholder='Enter Title' value={props.title} />
        </div>
    );
}
      
export function TextArea(props) {
    return (
        <div className="form-group">
            <textarea id='message'
                name="message" 
                onChange={props.handleChange}
                className="form-control"
                placeholder='Enter Message'
                value={props.message}
            />
        </div>
    );
}
      
export function FormBtn(props) {
    return (
        <button id='submit' onClick={props.handleSubmit} className="btn btn-primary">Submit
        </button>
    );
}

