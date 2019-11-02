import React, { Component } from 'react';
import NavBar from '../../NavBar/NavBar';
import axios from 'axios'
import UploadForm from '../../UploadForm';
import DefaultImg from '../../../default.jpg';
import ImgSection from '../../ImageSection';
import Wrapper from '../../Wrapper/';

class Pictures extends Component {
    state = {
        multerImage: DefaultImg,
        images: []
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

        axios.post('/image/uploadmulter', imageFormObj)
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
        axios.get('/image/uploadmulter')
            .then(res => {
                console.log(res)
                this.setState({
                    images: res.data 
                })
            })
    }

    deleteImage = id => {
        axios.delete('/image/uploadmulter/' + id)
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
                            <button style={{marginLeft: 180, marginTop: 20}} type="button" onClick={this.putOnPage} className="btn btn-success">Click here to Upload</button>
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

