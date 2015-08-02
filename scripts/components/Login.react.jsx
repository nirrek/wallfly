import React from 'react';
var axios = require('axios');
var login = require('../utils/Login.js');
var config = require('../utils/config.js');

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    axios.post(`${config.server}/login`, {
        username: this.state.username,
        password: this.state.password,
      }, {
        withCredentials: true
      })
      .then((response) => {
        login.setUser(response.data);
      })
      .catch((response) => {
        // TODO handle errors
      });
  }

  render() {
    let { username, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <input value={username}
                 onChange={this.onChange.bind(this, 'username')}
                 name="username"
                 placeholder="username" />
          <input value={password}
                 onChange={this.onChange.bind(this, 'password')}
                 name="password"
                 placeholder="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
