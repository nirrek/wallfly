var React = require('react');
var Api = require('../utils/Api.js');
var Navigation = require('react-router').Navigation;
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var SelectField = mui.SelectField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var cookie = require('react-cookie');
var User = require('../utils/User.js');

/**
 * Create Account View
 * Allows a user to register a new user account.
 */
var CreateAccount = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      userType: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      registrationFail: false, // did the registration request fail
      failureResponse: {}, // failure response from the server
    }
  },

  // Capture the input field state after each keypress.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Update select menu on change.
  onSelectChange(event) {
    var { name } = event.target.value; // mui selects have an object value
    this.setState({ 'userType': name });
  },

  // Handle the form submission event when the user tries to log in.
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    Api.createAccount({
      data: {
        userType: this.state.userType,
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
      },
      callback: (err, response) => {
        if (err) {
          console.log(err);
          console.log(response);
          this.setState({
            registrationFail: true,
            failureResponse: response.data,
          });
          return;
        }

        // TODO: pass data to the route to display some type of success msg.
        this.transitionTo('/');
      }
    });
  },

  // Produces a user friendly failure message given a failureResponse object.
  getFailureMessage(failureResponse) {
    if (failureResponse.errorType === 'ER_DUP_ENTRY') {
      return `Username is already registered.`;
    }
  },

  render() {
    var { userType, username, firstName, lastName, email, phone, password,
          registrationFail, failureResponse } = this.state;
    var regoFailMsg = registrationFail ? this.getFailureMessage(failureResponse)
                                       : null;

    return (
      <div style={style.page}>
        <Paper zDepth={1} style={style.loginContainer}>
          <h1 style={style.heading}>Register</h1>
          <form style={style.form} onSubmit={this.onSubmit}>
            <div style={style.error}> { regoFailMsg } </div>
            <SelectField
              value={userType}
              floatingLabelText="Account Type"
              onChange={this.onSelectChange}
              menuItems={userTypes} />
            <TextField
              value={username}
              name="username"
              onChange={this.onChange.bind(this, 'username')}
              floatingLabelText="Username" />
            <TextField
              value={firstName}
              name="firstName"
              onChange={this.onChange.bind(this, 'firstName')}
              floatingLabelText="First Name" />
            <TextField
              value={lastName}
              name="lastName"
              onChange={this.onChange.bind(this, 'lastName')}
              floatingLabelText="Last Name" />
            <TextField
              value={email}
              name="email"
              onChange={this.onChange.bind(this, 'email')}
              floatingLabelText="Email" />
            <TextField
              value={phone}
              name="phone"
              onChange={this.onChange.bind(this, 'phone')}
              floatingLabelText="Phone" />
            <TextField
              value={password}
              type="password"
              name="password"
              onChange={this.onChange.bind(this, 'password')}
              floatingLabelText="Password" />
            <RaisedButton type="submit" label="Create Account" primary={true} backgroundColor="#2ECC71" style={style.button} />
          </form>
        </Paper>
      </div>
    );
  }
});

// User types
var userTypes = [
  {name: 'owner', text: 'Owner'},
  {name: 'agent', text: 'Agent'},
  {name: 'tenant', text: 'Tenant'},
];

var style = {
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    flexGrow: 1,
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
    maxWidth: '20em',
  },
  button: {
    marginTop: '2em',
  }
};

module.exports = MuiContextified(CreateAccount);
