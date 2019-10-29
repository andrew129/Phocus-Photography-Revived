import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { Input, TextArea, FormBtn } from "../SearchForm/SearchForm";
import API from "../../utils/API";
import Comments from "../../components/Comments/Comments";

class Photos extends Component {

    state = {
        title: '',
        message: '',
        comments: []
    }

    componentDidMount() {
        this.loadComments()
    }

    onChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    loadComments = () => {
        API.getComments()
    .then(res =>
        this.setState({ comments: res.data, title: '', message: '' })
      )
      .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault()
        console.log('hello')
        API.saveComment({
            title: this.state.title,
            message: this.state.message
        })
        .then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <form>
                    <p>title: {this.state.title}</p>
                    <Input
                        value={this.state.title}
                        name="title"
                        onChange={this.onChange}
                    />
                    <TextArea
                        value={this.state.message}
                        name='message'
                        onChange={this.onChange}
                    />
                    <FormBtn
                        handleSubmit={this.handleFormSubmit}
                    />
                </form>
                {this.state.comments.map(comment => (
                    <Comments
                        id={comment._id}
                        key={comment._id}
                        title={comment.title}
                        message={comment.message}
                    />
                ))}
            </React.Fragment>
        )
    }
}

export default Photos;