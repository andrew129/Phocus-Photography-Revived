import axios from 'axios';

// takes in param of newUser passed in from reg form
export const register = newUser => {
  return axios
    .post('users/register', {
      // path to backend
      first_name: newUser.first_name, // newUser dist. here
      last_name: newUser.last_name, // payload of the axios .post message
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      console.log('Registered!');
    });
};

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
