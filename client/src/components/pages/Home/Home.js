import NavBar from '../../NavBar/NavBar';
import React from 'react';
import Jumbotron from '../../Jumbotron/Jumbotron';
import Footer from '../../Footer';
import './style.css';

const Home = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <Jumbotron/>
            <Footer />
        </React.Fragment>
    )
}

export default Home;