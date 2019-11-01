import NavBar from '../../NavBar/NavBar';
import React from 'react';
import Jumbotron from '../../Jumbotron/Jumbotron';
import './style.css';

const Home = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <Jumbotron/>
        </React.Fragment>
    )
}

export default Home;