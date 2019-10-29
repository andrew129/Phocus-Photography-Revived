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

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    loadComments = () => {
        API.getComments()
    .then(res =>
        this.setState({ comments: res.data })
      )
      .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        const { title, message } = this.state;
        event.preventDefault()
        console.log('hello');
        const data = {
            title,
            message
        }
        API.saveComment(data)
        .then(res => {
            console.log('the res', res)
            this.loadComments();
        })
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <NavBar/>
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