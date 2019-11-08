import NavBar from '../../NavBar/NavBar';
import React, { Component } from 'react';
import Jumbotron from '../../Jumbotron/Jumbotron';
import Footer from '../../Footer';
import './style.css';
import Wrapper from '../../../components/Wrapper';
import FeaturedPictures from '../../FeaturedPictures';
import axios from 'axios';

class Home extends Component {

    state = {
        images: []
    }

    componentDidMount() {
        this.getImages()
    }

    max

    getImages = () => {
        axios.get('/api/uploads/')
            .then(res => {
                const maxLikes = Math.max.apply(Math,res.data.map(function(data){return data.likes;}))
                console.log(res) 
                const filteredImages = res.data.filter(obj => obj.likes === maxLikes)
                this.setState({
                    images: filteredImages
                })
                console.log(this.state.images)              
            })
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Jumbotron/>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 text-center'>
                        <h1 className="display-4">Featured Photos</h1>
                        <p>Upload your best shots and you might appear here</p>
                        <Wrapper>
                            {this.state.images.map(image => (
                                <FeaturedPictures
                                    key={image._id}
                                    id={image._id}
                                    name='empty'
                                    photo={image.imageData}
                                />
                            ))}
                        </Wrapper>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}


export default Home;