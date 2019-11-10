import React from 'react';

function RegistrationForm(props) {
    return (
        <form>
            <div className="form-group">
                <label for="firstName">First Name</label>
                <input onChange={props.handleChange} name='firstName' value={props.firstName} type="text" classNameName="form-control" id="exampleFirstName" placeholder="Enter First Name">
                </input>
            </div>
            <div className="form-group">
                <label for="lastName">Last Name</label>
                <input onChange={props.handleChange} name='lastName' value={props.lastName} type="text" className="form-control" id="exampleLastName" placeholder="Enter Last Name">
                </input>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input onChange={props.handleChange} name='email' type="email" value={props.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input onChange={props.handleChange} name='password' value={props.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password">
                </input>
            </div>
            <button onClick={props.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default RegistrationForm;