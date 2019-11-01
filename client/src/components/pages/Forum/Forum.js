import React, { Component } from 'react';
import NavBar from '../../NavBar/NavBar';
import { Input, TextArea, FormBtn } from "../../SearchForm/SearchForm";
import API from "../../../utils/API";
import Topics from "../../Topics/Topics";
import DeleteBtn from "../../DeleteBtn";
import CommentBtn from "../../CommentBtn"
import ShowCommentBtn from "../../ShowCommentsBtn";
import { CommentTextArea, CommentFormBtn } from "../CommentForm/CommentForm";
import HideCommentBtn from "../../HideCommentBtn";
import CommentDisplay from "../../CommentDisplay";
import "./style.css";
import axios from 'axios'

class Forum extends Component {

    state = {
        title: '',
        message: '',
        text: '',
        topics: [],
        comments: [],
        showComponent: false,
        showComments: false
    }

    componentDidMount() {
        this.loadTopics()
        this.setState({
            showComments: false
        })
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
            this.loadTopics();
        })
    }

    showForm = id => {
        API.getTopicById(id)
        .then(res => {
            console.log(res.data._id)
            this.setState({
                showComponent: true
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
                    showComments: true
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
            <div>
                <NavBar/>
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
                            <h1 style={{ color: 'white', textAlign: 'center', position: 'relative', bottom: 70 }}>Current Discussions</h1>
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
                                    <CommentBtn
                                        saveComment={() => this.showForm(topic._id)}
                                    />
                                    <ShowCommentBtn
                                        showComments={() => this.getComments(topic._id)}
                                    />
                                    <HideCommentBtn
                                        hideComments={() => this.hideComments(topic._id)}
                                    />
                                    {this.state.showComments ?
                                        <div className='comment-display'>
                                         {this.state.comments.map(comment => (
                                            <CommentDisplay
                                                id={topic._id}
                                                key={topic._id}
                                                statement={comment.text}
                                            />
                                        ))}
                                        </div> :
                                        null
                                    }
                                    {this.state.showComponent ?
                                        <div style={{ marginTop: 30 }}className='topic-comment'>
                                            <CommentTextArea
                                                handleChange={this.handleChange}
                                                value={this.state.text}
                                                key={topic._id}
                                                id={topic._id}
                                            />
                                            <CommentFormBtn
                                                handleCommentSubmit={(e) => this.handleSubmit(e, topic._id)}
                                            /> 
                                        </div> :
                                        null
                                    }
                                </div>
                            ))}
                        </div>
                        <div className='col-3'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forum;