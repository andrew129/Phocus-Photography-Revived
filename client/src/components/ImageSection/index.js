import React from "react";
import './style.css';

const ImgSection = props => {
    return (
        <div className="card">
            <div className="img-container">
                <img onClick={props.showEnlarged} alt={props.name} src={props.photo}/>
            </div>
        </div>
    )
}

export default ImgSection;
