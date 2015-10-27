var React = require('react');
var Api = require('../utils/Api.js');
var Navigation = require('react-router').Navigation;
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var SelectField = mui.SelectField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var ImageSelector = require('./ImageSelector.jsx');
var Label = require('./Label.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var Radium = require('radium');

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
      avatar: '', // base64 encoding of the profile picture
      registrationFail: false, // did the registration request fail
      failureResponse: {}, // failure response from the server
      fileSizeError: '', // file size error message
      validationError: null, // clientside validation error object
    };
  },

  // Capture the input field state after each keypress.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Update select menu on change.
  onSelectChange(event, selectedUserTypeIndex) {
    var userType = userTypes[selectedUserTypeIndex].name;
    this.setState({ userType: userType });
  },

  // Handle the form submission event when the user tries to log in.
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // Clear any prior error state.
    this.setState({
      registrationFail: false,
      failureResponse: undefined,
      validationError: undefined,
    });

    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    Api.createAccount({
      data: {
        userType: this.state.userType,
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        avatar: this.state.avatar,
      },
      callback: (err, response) => {
        if (err) {
          var msg = (response.status === 0)
            ? 'Connection timed-out. Please try again.'
            : response.data;

          this.setState({
            registrationFail: true,
            failureResponse: msg,
          });
          return;
        }

        this.transitionTo('/login?accountCreated=true');
      }
    });
  },

  // Consumes a failureResponse from the server, and produces an appropriate
  // component for displaying the error the user.
  getFailureMessage(failureResponse) {
    if (failureResponse.errorType === 'ER_DUP_ENTRY') {
      return (
        <ErrorMessage fillBackground={true}>
          Email is already registered.
        </ErrorMessage>
      );
    }
    return <ErrorMessage fillBackground={true}>{failureResponse}</ErrorMessage>;
  },

  onImageSelected(payload) {
    this.setState({ avatar: payload.dataURL });
  },

  onImageSizeError(error) {
    var file = error.file;
    var sizeLimit = error.sizeLimit / 1000; // in KB (base10)
    var errorMsg = `${file.name} exceeds size limit of ${sizeLimit}kb.`;
    this.setState({ fileSizeError: errorMsg });
  },

  // Validate the form, returns the Joi result of the validation.
  validate() {
    return Joi.validate({
      userType: this.state.userType,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      avatar: this.state.avatar,
    }, schema);
  },

  render() {
    var { userType, username, firstName, lastName, email, phone, password,
          registrationFail, failureResponse, fileSizeError,
          validationError } = this.state;

    var validationErrorMsg = validationError ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    var regoFailMsg = registrationFail ? this.getFailureMessage(failureResponse)
                                       : null;

    var sizeError = fileSizeError ? (
      <ErrorMessage fillBackground={true}>Error: {fileSizeError}</ErrorMessage>
    ) : null;

    return (
      <div style={style.page}>
        <Paper zDepth={1} style={style.loginContainer}>
          <h1 style={style.heading}>Register</h1>
          <form style={style.form} onSubmit={this.onSubmit}>
            {regoFailMsg}
            {validationErrorMsg}

            <SelectField
              value={userType}
              valueMember="name"
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
            <div style={style.selectorContainer}>
              <Label>Profile Picture</Label>
              {sizeError}
              <ImageSelector maxSize={200000}
                             onImageSelected={this.onImageSelected}
                             onImageSizeError={this.onImageSizeError} />
            </div>
            <RaisedButton type="submit"
                          label="Create Account"
                          primary={true}
                          style={style.button} />
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
  },
  selectorContainer: {
    width: '100%'
  }
};

// Validation schema for user profile form data.
var schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/[a-zA-Z0-9]{5,100}/),
  firstName: Joi.string().alphanum().max(100),
  lastName: Joi.string().alphanum().max(100),
  phone: Joi.string().alphanum().min(8).max(10),
  email: Joi.string().email(),
  userType: Joi.string().valid(['tenant', 'agent', 'owner']),
  avatar: Joi.string(),
});

module.exports = Radium(MuiContextified(CreateAccount));
