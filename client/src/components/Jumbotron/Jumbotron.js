import React from 'react';
import './style.css';


const Jumbotron = () => {
    return (
        <div className="jumbotron text-center">
            <h1 id='title' className="display-4">Phocus</h1>
            <p className="lead">The Greatest Community of Photographers On the Web</p>
            <p>Check out our Pictures section to see all our community has to offer, interested in adding your own photos, join by clicking below.</p>
            <a className="btn btn-primary btn-lg" href="/" role="button">Sign Up</a>
        </div>
    )
}

export default Jumbotron;