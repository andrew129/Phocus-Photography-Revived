import React, { Component } from 'react';
// import NavBar from '../../NavBar/NavBar';
import { Input, TextArea, FormBtn } from "../../SearchForm/SearchForm";
import API from "../../../utils/API";
import Topics from "../../Topics/Topics";
import DeleteBtn from "../../DeleteBtn";
import ShowCommentBtn from "../../ShowCommentsBtn";
import { CommentTextArea, CommentFormBtn } from "../../CommentForm/CommentForm";
import HideCommentBtn from "../../HideCommentBtn";
import CommentDisplay from "../../CommentDisplay";
import "./style.css";
import axios from 'axios';
import imageOne from '../../../sunset-1.jpg';
import imageTwo from '../../../images/sunset1.JPG';
import imageThree from '../../../images/sunset2.JPG';
import imageFour from '../../../images/sunset3.JPG';

class Forum extends Component {

    state = {
        title: '',
        message: '',
        text: '',
        id: '',
        topics: [],
        comments: [],
        showComponent: false,
        selectedForm: '',
        showComments: false, 
        images: [imageOne, imageTwo, imageThree, imageFour],
        count: 0 
    }

    componentDidMount() {
        this.loadTopics()
        setInterval(this.changeImage, 30000)
        this.setState({
            showComments: false
        })
    }

    changeImage = () => {
        this.setState({
            count: this.state.count + 1
        })
        if (this.state.count === 4) {
            this.setState({
                count: 0
            })
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    loadTopics = () => {
        API.getTopics()
    .then(res =>
        this.setState({ topics: res.data })
      )
      .catch(err => console.log(err));
    }

    deleteTopic = id => {
        console.log('hello')
        API.deleteTopic(id)
          .then(res => {
            console.log(res)
            this.loadTopics()
          })
          .catch(err => console.log(err));
    };

    handleFormSubmit = event => {
        const { title, message } = this.state;
        event.preventDefault()
        console.log('hello');
        const data = {
            title,
            message
        }
        API.saveTopic(data)
        .then(res => {
            console.log('the res', res)
            this.setState({
                title: '',
                message: ''
            })
            this.loadTopics();
        })
    }

    showForm = (id) => {
        API.getTopicById(id)
        .then(res => {
            console.log(res.data._id)
            this.setState({
                showComponent: true,
                selectedForm: res.data._id
            })
        })
        .catch(err => console.log(err))
    }

    getComments = id => {
        API.getTopicById(id)
        .then(res => {
            console.log(res)
            const messages = res.data.comments
                this.setState({
                    comments: messages,
                    showComments: true,
                    selectedForm: res.data._id
                })
        })
        .catch(err => console.log(err))
    }

    hideComments = () => {
        this.setState({
            showComments: false
        })
    }

    handleSubmit = (e, id) => {
        console.log('the e', e);
        const { text } = this.state
        e.preventDefault()
        console.log(this.state.text)
        axios.post('/api/topics/' + id, { text })
            .then(function(response){
                console.log('saved successfully', response)
            });
        this.setState({
            showComponent: false
        })
    }

    render() {
        return (
            <div style={{ backgroundImage: `url(${this.state.images[this.state.count]})` , backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} className='content'>
                <div className='container'>
                    <div className="row">
                        <div className='col-3'>
                        </div>
                        <div className='col-6'>
                            <form>
                                <Input
                                    value={this.state.title}
                                    handleChange={this.handleChange}
                                />
                                <TextArea
                                    value={this.state.message}
                                    handleChange={this.handleChange}
                                />
                                <FormBtn
                                    handleSubmit={this.handleFormSubmit}
                                />
                            </form>
                            <h1 style={{ color: 'white', textAlign: 'center', position: 'relative', bottom: 70, marginTop: 70 }}>Current Discussions</h1>
                            {this.state.topics.map(topic => (
                                <div className="comment-section">
                                    <Topics
                                        id={topic._id}
                                        key={topic._id}
                                        title={topic.title}
                                        message={topic.message}
                                    />

                                    <DeleteBtn
                                        deleteTopic={() => this.deleteTopic(topic._id)}
                                        />
                                    <button type="button" onClick={() => this.showForm(topic._id)} className="btn btn-transparent">Reply</button>
                                    <ShowCommentBtn
                                        showComments={() => this.getComments(topic._id)}
                                    />
                                    <HideCommentBtn
                                        hideComments={() => this.hideComments(topic._id)}
                                        />
                                    {(this.state.showComponent && topic._id === this.state.selectedForm) &&
                                        <div style={{ marginTop: 30 }} className='topic-comment'>
                                            <CommentTextArea
                                                handleChange={this.handleChange}
                                                value={this.state.text}
                                            />
                                            <CommentFormBtn
                                                handleCommentSubmit={(e) => this.handleSubmit(e)}
                                            /> 
                                        </div>
                                    }
                                    {(this.state.showComments && topic._id === this.state.selectedForm) &&
                                        <div className='comment-display'>
                                            {this.state.comments.map(comment => (
                                                <CommentDisplay
                                                id={topic._id}
                                                key={topic._id}
                                                statement={comment.text}
                                                />
                                            ))}
                                        </div> 
                                    }
                                </div>
                            ))}
                            <div className='col-3'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forum;
//**IMPORTANT**//
//**map is running show component for every item in the array need to fix**//
//POSSIBLE FIX: DO THE MAP METHOD INSIDE OF A SEPERATE FUNCTION AND GRAB THE CURRENT ID//
//implement rotating slideshow of pictures in background to fit the theme//
//**---------------------------------------------------------------------- **//