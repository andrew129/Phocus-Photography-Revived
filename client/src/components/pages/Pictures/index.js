import React, { Component } from 'react';
import NavBar from '../../NavBar/NavBar';
import axios from 'axios'
import UploadForm from '../../UploadForm';
import DefaultImg from '../../../default.jpg';
import ImgSection from '../../ImageSection';
import Wrapper from '../../Wrapper/';
import './style.css'

class Pictures extends Component {
    state = {
        multerImage: DefaultImg,
        images: [],
        likes: 0,
        dislikes: 0
    }

    componentDidMount() {
        this.getImages()
    }

    uploadImage = event => {
        console.log('hello')
        let imageFormObj = new FormData()

        imageFormObj.append("imageName", "multer-image-" + Date.now())
        imageFormObj.append("imageData", event.target.files[0])

        this.setState({
            multerImage: URL.createObjectURL(event.target.files[0])
        })

        axios.post('/api/uploads', imageFormObj)
            .then((data) => {
                console.log(data)
                if (data.data.success) {
                    alert('successful upload')
                }
            })
            .catch((err) => {
                console.log(err)
                alert("Error While Uploading")
            })
    }

    getImages = () => {
        axios.get('/api/uploads')
            .then(res => {
                console.log(res)
                this.setState({
                    images: res.data,
                })
            })
    }

    deleteImage = id => {
        axios.delete('/api/uploads/' + id)
            .then(res => {
                this.getImages()
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    putOnPage = () => {
        this.getImages()
        this.setState({
            multerImage: DefaultImg
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
                likes: res.data.likes,
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
            <div>
               <NavBar/> 
                <div className='container'>
                    <div className='row'>
                        <div className='col-3'>
                        </div>
                        <div className='col-6'>
                            <UploadForm
                                handleChange={this.uploadImage}
                                image={this.state.multerImage}
                            />
                            <button style={{marginLeft: 180, position: 'relative', bottom: 69, left: 5}} type="button" onClick={this.putOnPage} className="btn btn-success">Click here to Upload</button>
                        </div>
                        <div className='col-3'>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Wrapper>
                                {this.state.images.map(image => (
                                    <div key={image._id}>
                                        <ImgSection
                                            name='empty'
                                            key={image._id}
                                            id={image._id}
                                            photo={image.imageData}
                                        />
                                        
                                        <button id='buttonone' style={{position: 'relative', bottom: 41, left: 8}} onClick={() => this.updateLikes(image._id)} className='like'>
                                            <span class="like"><i className="fa fa-thumbs-up"></i></span>
                                            <span className='count'>{image.likes}</span>
                                        </button>
                                        <button id='buttontwo' style={{position: 'relative', bottom: 41, left: 220}} onClick={() => this.updateDislikes(image._id)} className='dislike'>
                                            <span class="like"><i className="fa fa-thumbs-down"></i></span>
                                            <span className='counttwo'>{image.dislikes}</span>
                                        </button>
                                        <button type="button" onClick={() => this.deleteImage(image._id)} className="btn btn-danger">Delete Image</button>
                                    </div>
                                ))}
                            </Wrapper>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pictures;

