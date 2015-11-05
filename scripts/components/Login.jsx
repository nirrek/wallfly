var React = require('react');
var Api = require('../utils/Api.js');
var Navigation = require('react-router').Navigation;
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var Snackbar = mui.Snackbar;
var User = require('../utils/User.js');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Radium = require('radium');
var Property = require('../utils/Property.js');

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
      authFailure: '', // server auth failure message
      validationError: false, // clientside validation failure
    };
  },

  componentDidMount() {
    // Show an account created snackbar if coming from account creation.
    if (this.refs.snackbar) {
      setTimeout(() => this.refs.snackbar.show(), 400);
    }

    // Autofocus username field onMount.
    if (this.refs.username) {
      setTimeout(() => this.refs.username.focus(), 300);

    }
  },

  /**
   * Capture the input field state after each keypress.
   * @param  {String} field The name of the field firing the event.
   * @param  {Object} event The event object.
   */
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  /**
   * Handle the form submission event when the user tries to log in.
   * @param  {Object} event The submit event object.
   */
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // Clear prior error states.
    this.setState({
      validationError: false,
      authFailure: ''
    });

    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    Api.login({
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      callback: (err, response) => {
        if (err) {
          var msg = (response.status === 0)
            ? 'Connection timed-out. Please try again.'
            : response.data;
          this.setState({ authFailure: msg });
          return;
        }

        // Clear any cached user/property models
        User.deleteUser();
        Property.deleteProperty();

        User.setUser(response.data);

        // Transition to the given userType's dashboard.
        var { type: userType } = response.data;
        if      (userType === 'owner')  this.transitionTo('owner/propertyList');
        else if (userType === 'agent')  this.transitionTo('agent/propertyList');
        else if (userType === 'tenant') {
          // Initialize local property state for the tenant.
          Api.getUserPropertyDetails({
            callback: (err, response) => {
              if (err) return console.log(err);
              Property.setProperty(response.data);
            }
          });
          this.transitionTo('tenant/propertyDetails');
        }
      }
    });
  },

  /**
   * Validate the form, returns the Joi result of the validation.
   * @return {Object} Joi validation object.
   */
  validate() {
    return Joi.validate({
      username: this.state.username,
      password: this.state.password,
    }, schema);
  },

  render() {
    var { username, password, authFailure, validationError } = this.state;
    if (this.props.location.query) {
      var accountCreated = this.props.location.query.accountCreated;
      var testAccounts = this.props.location.query.testAccounts;
    }
    var authFailMessage = authFailure ? (
      <ErrorMessage fillBackground={true}>{authFailure}</ErrorMessage>
    ) : null;

    // Form validation error
    var validationError = (validationError) ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    return (
      <div style={styles.page}>
        {accountCreated ? (
          <Snackbar
            ref="snackbar"
            message="Account successfully created. You can now login."
            autoHideDuration={3000} />
        ) : null}

        <Paper zDepth={1} style={styles.loginContainer}>
          <h1 style={styles.heading}>Login</h1>
          <form style={styles.form} onSubmit={this.onSubmit}>
            {validationError}
            {authFailMessage}
            <TextField
              ref="username"
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
            <RaisedButton type="submit" label="Login" primary={true} style={styles.button} />
          </form>
        </Paper>
        <div style={styles.registerContainer}>
          Don't have an account? <Link to="createAccount">Register Now</Link>
        </div>

        { testAccounts ? (
          <div style={styles.testAccounts}>
            <h3 style={styles.testAccountsTitle}>The following test accounts can be used.</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Username</th><th>Password</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>tenant</td><td>tenant</td></tr>
                <tr><td>owner</td><td>owner</td></tr>
                <tr><td>agent</td><td>agent</td></tr>
              </tbody>
            </table>
          </div>
        ): null }
      </div>
    );
  }
});

/**
 * Joi validation schema for the form data.
 */
var schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/[a-zA-Z0-9]{5,100}/),
});

var styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    flex: '1 0 auto',
  },
  loginContainer: {
    padding: '2em',
  },
  heading: {
    textAlign: 'center',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 260,
    maxWidth: 500,
  },
  button: {
    marginTop: '2em',
    width: '4em',
  },
  registerContainer: {
    padding: '1em'
  },
  testAccounts: {
    marginTop: '2em',
    textAlign: 'center',
  },
  table: {
    margin: '0 auto',
  },
};

module.exports = MuiContextified(Radium(Login));
