// import NavBar from '../../NavBar/NavBar';
import React, { Component } from 'react';
import Jumbotron from '../../Jumbotron/Jumbotron';
import Footer from '../../Footer';
import './style.css';
import Wrapper from '../../Wrapper';
import FeaturedPictures from '../../FeaturedPictures';
import axios from 'axios';

class Intro extends Component {

    state = {
        images: []
    }

    componentDidMount() {
        // update authenticated state on logout
        // s
        this.getImages()
    }

    getImages = () => {
        axios.get('/api/uploads/')
            .then(res => {
                const likes = []
                res.data.forEach(data => {
                    likes.push(data.likes)
                })
                likes.sort(function(a, b){return b-a})
                const slicedLikes = likes.slice(0,3)
                const filteredImages = res.data.filter(obj => {
                    return slicedLikes.includes(obj.likes)
                })
                filteredImages.sort((a, b) => b.likes - a.likes);
                this.setState({
                    images: filteredImages
                })
                console.log(this.state.images)         
            })
    }

    updateLikes = id => {
        axios.get('/api/uploads/' + id)
            .then(res => {
                console.log(res)
                const data = {
                    likes: res.data.likes + 1,
                    dislikes: res.data.dislikes
                }
                this.setState(data)
                axios.put('/api/uploads/' + id, data)
                    .then(res => {
                        console.log(res)
                        this.getImages()
                    })
                    .catch(err => console.log(err))
            })
    }

    updateDislikes = id => {
        axios.get('/api/uploads/' + id)
        .then(res => {
            console.log(res)
            const data = {
                likes: res.data.likes - 1,
                dislikes: res.data.dislikes + 1
            }
            this.setState(data)
            axios.put('/api/uploads/' + id, data)
                .then(res => {
                    console.log(res)
                    this.getImages()
                })
                .catch(err => console.log(err))
        })
    }

    render() {
        return (
            <div className='everything'>
                {/* <NavBar/> */}
                <Jumbotron/>
                <div className='container'>
                    <div className='row picture-section'>
                        <div className='col-12 text-center'>
                        <h1 style={{marginBottom: 2, color: 'white', position: 'relative', bottom: 7}} className="display-4">Featured Photos</h1>
                        <p style={{borderBottom: 'double', borderColor: '#0099ff', position: 'relative', bottom: 20, paddingBottom: 5, color: 'white'}}>Upload your best shots and you might appear here</p>
                        <Wrapper>
                            {this.state.images.map(image => (
                                <div>
                                    <FeaturedPictures
                                        key={image._id}
                                        id={image._id}
                                        name='empty'
                                        photo={image.imageData}
                                    />
                                    <h3 id='thisname' style={{right: -50}}>{image.name}</h3>
                                    <button id='buttonone' onClick={() => this.updateLikes(image._id)} className='like'>
                                        <span style={{color: 'blue'}} class="like"><i className="fa fa-thumbs-up"></i></span>
                                        <span className='count'>{image.likes}</span>
                                    </button>
                                    <button id='buttontwo' onClick={() => this.updateDislikes(image._id)} className='dislike'>
                                        <span style={{color: 'red'}} class="like"><i className="fa fa-thumbs-down"></i></span>
                                        <span className='counttwo'>{image.dislikes}</span>
                                    </button>
                                </div>
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


export default Intro;