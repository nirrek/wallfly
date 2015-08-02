import React from 'react';
var axios = require('axios');
var login = require('../utils/Login.js');

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onChange(field, event) {
    console.log('onChange: ', event.target.value);

    this.setState({
      [field]: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(this.state);

    axios.post('http://localhost:8000/login', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        login.setUser(response.data);
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  render() {
    let { username, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit} action="http://localhost:8000/login" method="POST">
          <input value={username} onChange={this.onChange.bind(this, 'username')} name="username" placeholder="username" />
          <input value={password} onChange={this.onChange.bind(this, 'password')} name="password" placeholder="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
