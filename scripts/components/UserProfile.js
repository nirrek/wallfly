var React = require('react');
var User = require('../utils/User.js');
var Api = require('../utils/Api.js');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;
var List = mui.List;
var ListItem = mui.ListItem;
var FontIcon = mui.FontIcon;
var Label = require('./Label.jsx');
var MuiContextified = require('./MuiContextified.jsx');
var ImageSelector = require('./ImageSelector.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Joi = require('joi');
var DialogEnhanced = require('./DialogEnhanced.jsx');
var JoiError = require('./JoiError.jsx');

/*
 * UserProfile Component.
 * This component is a dialog window that shows the current user's profile
 * and also allows them to edit and update their profile details.
 */
var UserProfile = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired, // display the dialog?
  },

  getInitialState() {
    return {
      isEditing: false, // is the user editing their profile
      ...User.getUser(),
    };
  },

  // Puts the profile into editing mode.
  enableEdit() {
    this.setState({
      isEditing: true,
      updateError: false, // init error state
      validationError: undefined, // init error state
    });
  },

  // Puts the profile back into viewing mode.
  cancelEdit() {
    this.setState({
      ...User.getUser(), // clear modified user state
      isEditing: false,
    });
  },

  // Validate the form, returns the Joi result of the validation.
  validate() {
    return Joi.validate({
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
      avatar: this.state.avatar,
    }, schema);
  },

  // Updates the user profile on the server.
  updateProfile() {
    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    Api.updateUser({
      data: {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        email: this.state.email,
        avatar: this.state.avatar,
      },
      callback: (err, res) => {
        if (err) {
          this.setState({ updateError: true });
          return;
        }

        Api.getUser({
          callback: (err, response) => {
            User.setUser(response.data);
            this.setState({
              ...User.getUser(),  // ensure component state is in sync
              isEditing: false,
            });
          }
        });
      }
    });
  },

  // Capture the text inputted in the form in react state.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Capture selected image data in react state.
  onImageSelected(data) {
    this.setState({ avatar: data.dataURL });
  },

  render() {
    var { isOpen } = this.props;
    var { avatar, firstName, lastName, phone, email,
          isEditing, updateError, validationError } = this.state;

    // Server side error during profile update.
    var updateError = updateError ? (
      <ErrorMessage>Error during update. Please try again</ErrorMessage>
    ) : null;

    // Form validation error
    var validationError = (validationError) ? (
      <JoiError error={validationError} />
    ) : null;

    // List Icons
    var nameIcon = <FontIcon className="material-icons">person</FontIcon>;
    var emailIcon = <FontIcon className="material-icons">email</FontIcon>;
    var phoneIcon = <FontIcon className="material-icons">phone</FontIcon>;

    // Main content is dependent upon being in edit mode or not.
    var content = (!isEditing) ? (
      <div>
        <List>
          <div><img style={styles.img} src={avatar} /></div>
          <ListItem leftIcon={nameIcon} primaryText={`${firstName} ${lastName}`} />
          <ListItem leftIcon={emailIcon} primaryText={email} />
          <ListItem leftIcon={phoneIcon} primaryText={phone} />
        </List>
      </div>
    ) : (
      <div>
        {updateError}
        {validationError}
        <TextField value={firstName}
                   onChange={this.onChange.bind(this, 'firstName')}
                   floatingLabelText="First Name" />
        <TextField value={lastName}
                   onChange={this.onChange.bind(this, 'lastName')}
                   floatingLabelText="Last Name" />
        <TextField value={email}
                   onChange={this.onChange.bind(this, 'email')}
                   floatingLabelText="Email Address" />
        <TextField value={phone}
                   onChange={this.onChange.bind(this, 'phone')}
                   floatingLabelText="Phone" />
        <Label>Profile Picture</Label>
        <ImageSelector image={avatar}
                       onImageSelected={this.onImageSelected}
                       onImageSizeError={null} />
      </div>
    );

    // Dialog buttons are dependent on edit mode or not
    var actions;
    if (!isEditing) {
      actions = [
        { text: 'Close', onTouchTap: this.props.onClose },
        { text: 'Edit Profile', onTouchTap: this.enableEdit }
      ];
    } else {
      actions = [
        { text: 'Cancel', onTouchTap: this.cancelEdit },
        { text: 'Update Profile', onTouchTap: this.updateProfile }
      ];
    }

    return (
      <DialogEnhanced isOpen={isOpen}
                      modal={true}
                      title="Profile"
                      actions={actions}
                      autoScrollBodyContent={true}>
        {content}
      </DialogEnhanced>
    );
  }
});

// Validation schema for user profile form data.
var schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  firstName: Joi.string().alphanum().max(100),
  lastName: Joi.string().alphanum().max(100),
  phone: Joi.string().alphanum().min(8).max(10),
  email: Joi.string().email(),
  avatar: Joi.string(),
});

var styles = {
  img: {
    borderRadius: 4,
  },
};

module.exports = MuiContextified(UserProfile);
