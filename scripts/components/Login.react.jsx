var React = require('react');
var axios = require('axios');
var Api = require('../utils/Api.js');
var Navigation = require('react-router').Navigation;

/**
 * Login View
 * The login view allows a user to log into the service using their credentials.
 */
var Login = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      username: '', // user entered username
      password: '', // user entered password
      authFailure: false, // did the authentication request fail
    }
  },

  // Capture the input field state after each keypress.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Handle the form submission event when the user tries to log in.
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    Api.login({
      username: this.state.username,
      password: this.state.password,
      callback: (err, response) => {
        if (err) {
          this.setState({ authFailure: true });
          return;
        }

        // Transition to the propertyDetails view on successful login.
        this.transitionTo('propertyDetails');
      }
    });
  },

  render() {
    var { username, password, authFailure } = this.state;
    var authFailMessage = authFailure ? 'Username or password invalid' : null;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div> { authFailMessage } </div>
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
});

export default Login;
