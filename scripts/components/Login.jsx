var React = require('react');
var Api = require('../utils/Api.js');
var Navigation = require('react-router').Navigation;
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;

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
        <Paper zDepth={1} style={style.loginContainer}>
          <h1 style={style.heading}>Login</h1>
          <form style={style.form} onSubmit={this.onSubmit}>
            <div style={style.error}> { authFailMessage } </div>
            <TextField
              value={username}
              name="username"
              onChange={this.onChange.bind(this, 'username')}
              floatingLabelText="Username" />
            <TextField
              value={password}
              name="password"
              onChange={this.onChange.bind(this, 'password')}
              floatingLabelText="Password" />
            <RaisedButton type="submit" label="Login" primary={true} backgroundColor="#2ECC71" style={style.button} />
          </form>
        </Paper>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '100%',
  },
  loginContainer: {
    padding: '2em',
    // display: 'flex',
    // flexDirection: 'row',
    // 'justifyContent': 'center',
  },
  heading: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '20em',
  },
  button: {
    marginTop: '2em',
    width: '4em',
  }
};

module.exports = MuiContextified(Login);
