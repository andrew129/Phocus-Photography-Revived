import React from 'react';
import '.style.css';

export function Login(props) {
    return (
        <div className="form-group">
            <textarea id='comment'
                onChange={props.handleChange}
                className="form-control"
                placeholder='Enter Comment'
                name='text'
                value={props.text}
            />
            </div>
        );
    }
          
export function LoginSbmBtn(props) {
    return (
        <button id='comment-submit' onClick={props.handleCommentSubmit} className="btn btn-primary">Submit
        </button>
    );
}