var React = require('react');
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
      data: {
        username: this.state.username,
        password: this.state.password,
      },
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
      <div style={style.page}>
        <h1>Login</h1>
        <form style={style.form} onSubmit={this.onSubmit}>
          <div style={style.error}> { authFailMessage } </div>
          <input value={username}
                 onChange={this.onChange.bind(this, 'username')}
                 name="username"
                 placeholder="username"
                 style={style.input}/>
          <input value={password}
                 onChange={this.onChange.bind(this, 'password')}
                 name="password"
                 placeholder="password"
                 style={style.input}/>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  input: {
    border: '1px solid rgba(0,0,0, .05)',
    backgroundColor: '#efefef',
    borderRadius: 4,
    padding: '1em',
    fontSize: 16,
    marginBottom: '1em',
  },
  error: {
    color: '#CE5646',
  }
};

module.exports = Login;
