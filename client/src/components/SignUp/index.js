import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
            password: '',
            first_name: '',
            last_name: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, email: ')
		console.log(this.state.email)
		event.preventDefault()

		//request to server to add a new email/password
		axios.post('/user/', {
			email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('email already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)
			})
	}


render() {
	return (
		<div className="SignupForm">
			<h4>Sign up</h4>
			<form className="form-horizontal">
            <div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="password">First Name: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="First Name"
							type="text"
							name="first_name"
							value={this.state.first_name}
							onChange={this.handleChange}
						/>
					</div>
				</div>
                <div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="password">Last Name: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="Last Name"
							type="text"
							name="last_name"
							value={this.state.last_name}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="email">email: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="email"
							name="email"
							placeholder="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="password">Password: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group ">
					<div className="col-7"></div>
					<button
						className="btn btn-primary col-1 col-mr-auto"
						onClick={this.handleSubmit}
						type="submit"
					>Sign up</button>
				</div>
			</form>
		</div>

	)
}
}

export default Signup;