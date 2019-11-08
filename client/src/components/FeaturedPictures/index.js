import React from 'react';


function FeaturedPictures(props) {
    return (
        <div>
            <div className="card">
                <div className="img-container">
                    <img alt={props.name} src={props.photo}></img>
                </div>
            </div>
        </div>
    )
}

export default FeaturedPictures;