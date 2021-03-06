import React, { Component } from 'react';
// import NavBar from '../../NavBar/NavBar';
import axios from 'axios'
import UploadForm from '../../UploadForm';
import DefaultImg from '../../../default.jpg';
import ImgSection from '../../ImageSection';
import Wrapper from '../../Wrapper/';
// import Input from '../../SearchForm/SearchForm'
import Footer from '../../Footer';
import './style.css'

class Pictures extends Component {
    state = {
        multerImage: DefaultImg,
        images: [],
        likes: 0,
        dislikes: 0,
        showEnlarged: false,
        liked: false,
        disliked: false,
        selectedPhoto: '',
        name: '',
    }

    componentDidMount() {
        this.getImages()
    }

    handleChange = event => {
        console.log(event.target)
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    // getUser = () => {
    //     axios.get('/user/login').then(response => {
    //         console.log('my response' + response.data)
    //     })
    // }

    uploadImage = event => {
        event.preventDefault()
        console.log(this.state.name)
        console.log('hello')
        let imageFormObj = new FormData()

        imageFormObj.append("imageName", "multer-image-" + Date.now())
        imageFormObj.append("imageData", event.target.files[0])
        imageFormObj.append("name", this.state.name)

        this.setState({
            multerImage: URL.createObjectURL(event.target.files[0])
        })

        axios.post('/api/uploads/', imageFormObj)
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
        this.setState({
            name: ''
        })
    }

    getImages = () => {
        axios.get('/api/uploads/')
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
                this.setState({
                    selectedPhoto: res.data.id
                })
                console.log(res)
                if (this.state.liked === false) {
                    const data = {
                        likes: res.data.likes + 1,
                        dislikes: res.data.dislikes
                    }
                    this.setState(data)
                    axios.put('/api/uploads/' + id, data)
                    .then(res => {
                        console.log(res)
                        this.getImages()
                        this.setState({
                            liked: true
                        })
                    })
                    .catch(err => console.log(err))
                }
                if (this.state.liked === true) {
                    alert("Stop, you've already voted on this picture")
                    const data = {
                        likes: res.data.likes,
                        dislikes: res.data.dislikes
                    }
                    this.setState(data)
                    axios.put('/api/uploads/' + id, data)
                        .then(res => {
                            console.log(res)
                            this.getImages()
                            this.setState({
                                liked: false
                            })
                        })
                        .catch(err => console.log(err))
                }
            })
    }

    updateDislikes = id => {
        axios.get('/api/uploads/' + id)
            .then(res => {
                console.log(res)
                if (this.state.disliked === false) {
                    const data = {
                        likes: res.data.likes,
                        dislikes: res.data.dislikes + 1
                    }
                    this.setState(data)
                    axios.put('/api/uploads/' + id, data)
                    .then(res => {
                        console.log(res)
                        this.getImages()
                        this.setState({
                            disliked: true
                        })
                    })
                    .catch(err => console.log(err))
                }
                if (this.state.disliked === true) {
                    alert('stop')
                    const data = {
                        likes: res.data.likes - 1,
                        dislikes: res.data.dislikes
                    }
                    this.setState(data)
                    axios.put('/api/uploads/' + id, data)
                        .then(res => {
                            console.log(res)
                            this.getImages()
                            this.setState({
                                disliked: false
                            })
                        })
                        .catch(err => console.log(err))
                }
            })
    }

    render() {
        return (
            <div className='main-content'>
               {/* <NavBar/>  */}
                <div className='container'>
                    <div className='row'>
                        <div className='col-3'>
                        </div>
                        <div className='col-6'>
                            {/* <Input
                                value={this.state.name}
                                handleChange={this.handleChange}
                            /> */}
                            <UploadForm
                                handleChange={this.uploadImage}
                                image={this.state.multerImage}
                            />
                            <div className="form-group input text-center">
                                <input style={{position: 'relative', bottom: 318, width: 400, left: 70}} id='name' name="name" onChange={this.handleChange} className="form-control" placeholder='Enter Full Name' value={this.state.name} />
                            </div>
                            <button style={{marginLeft: 180, position: 'relative', bottom: 115, left: 5}} type="button" onClick={this.putOnPage} className="btn btn-success">Click here to Upload</button>
                        </div>
                        <div className='col-3'>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Wrapper>
                                {this.state.images.map(image => (
                                    <div class='image-section' key={image._id}>
                                        <ImgSection
                                            name='empty'
                                            key={image._id}
                                            id={image._id}
                                            photo={image.imageData}
                                        />
                                        <h3 id='yourname'>{image.name}</h3>
                                        <button id='buttonone' style={{position: 'relative', bottom: 78, left: 8}} onClick={() => this.updateLikes(image._id)} className='like'>
                                            <span style={{color: 'blue'}} className="like"><i className="fa fa-thumbs-up"></i></span>
                                            <span className='count'>{image.likes}</span>
                                        </button>
                                        <button id='buttontwo' style={{position: 'relative', bottom: 78, left: 208}} onClick={() => this.updateDislikes(image._id)} className='dislike'>
                                            <span style={{color: 'red'}} className="dislike"><i className="fa fa-thumbs-down"></i></span>
                                            <span className='counttwo'>{image.dislikes}</span>
                                        </button>
                                        {/* <button type="button" onClick={() => this.deleteImage(image._id)} className="btn btn-danger">Delete Image</button> */}
                                    </div>
                                    // {this.state.showEnlarged ?
                                    //     <div className="modal" tabindex="-1" role="dialog">
                                    //         <div className="modal-dialog" role="document">
                                    //             <div className="modal-content">
                                    //                 <div className="modal-header">
                                    //                     <h5 className="modal-title">Modal title</h5>
                                    //                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    //                         <span aria-hidden="true">&times;</span>
                                    //                     </button>
                                    //                 </div>
                                    //                 <div className="modal-body">
                                    //                     <p>Modal body text goes here.</p>
                                    //                 </div>
                                    //                 <div className="modal-footer">
                                    //                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    //                 </div>
                                    //             </div>
                                    //         </div>
                                    //     </div> : 
                                    //     null
                                    // }
                                ))}
                            </Wrapper>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Pictures;

