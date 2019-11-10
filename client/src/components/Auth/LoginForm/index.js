import React from 'react';

function LoginForm (props) {
    return (
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input onChange={props.handleChange} name='email' type="email" value={props.email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input onChange={props.handleChange} name='password' value={props.password} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </input>
            </div>
            <button onClick={props.handleSubmit} type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default LoginForm;