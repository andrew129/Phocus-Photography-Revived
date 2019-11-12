import React from 'react';

const UploadForm = props => {
   return (
    <div style={{marginTop: 30, background: 'white', opacity: 0.8, height: 500, paddingTop: 10, borderColor: 'black', borderStyle: 'solid'}} className="image-container text-center">
        <div className="process">
            <h1 style={{color: 'black'}} className="process__heading">Gallery</h1>
            <p style={{color: 'black', marginBottom: 30, position: 'relative', bottom: 10}}  className="process__details"><strong>Upload Your Original Images, receive feedback from other users</strong></p>

            <input style={{marginLeft: 120, cursor: 'pointer', position: 'relative', bottom: 10}} type="file" className="process__upload-btn" onChange={props.handleChange}></input>
            <img style={{height: 300, width: 400, marginTop: 30}} src={props.image} alt='empty' className="process__image"></img>
        </div>
    </div>
   ) 
}

export default UploadForm;