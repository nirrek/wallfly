var React = require('react');
var Api = require('../utils/Api.js');
var Navigation = require('react-router').Navigation;
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var Snackbar = mui.Snackbar;
var cookie = require('react-cookie');
var User = require('../utils/User.js');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

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

  componentDidMount() {
    if (this.refs.snackbar) {
      setTimeout(() => this.refs.snackbar.show(), 400);
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

        User.setUser(response.data);

        // Transition to the give userType's dashboard.
        var { type: userType } = response.data;
        if      (userType === 'owner') this.transitionTo('owner/propertyList');
        else if (userType === 'agent') this.transitionTo('agent/propertyList');
        else if (userType === 'tenant') this.transitionTo('tenant/propertyDetails');
      }
    });
  },

  render() {
    var { username, password, authFailure } = this.state;
    if (this.props.location.query) {
      var accountCreated = this.props.location.query.accountCreated;
    }
    var authFailMessage = authFailure ? 'Username or password invalid' : null;

    return (
      <div style={style.page}>
        {accountCreated ? (
          <Snackbar
            ref="snackbar"
            message="Account successfully created. You can now login."
            autoHideDuration={3000} />
        ) : null}

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
              type="password"
              onChange={this.onChange.bind(this, 'password')}
              floatingLabelText="Password" />
            <RaisedButton type="submit" label="Login" primary={true} backgroundColor="#2ECC71" style={style.button} />
          </form>
        </Paper>
        <div style={style.registerContainer}>
          Don't have an account? <Link to="createAccount">Register Now</Link>
        </div>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    flexGrow: 1,
  },
  loginContainer: {
    padding: '2em',
    // display: 'flex',
    // flexDirection: 'row',
    // 'justifyContent': 'center',
  },
  heading: {
    textAlign: 'center',
    margin: 0,
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
  },
  registerContainer: {
    padding: '1em'
  }
};

module.exports = MuiContextified(Login);
