var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var SelectField = mui.SelectField;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;
var ErrorMessage = require('./ErrorMessage.jsx');

var OwnerRepairRequestStatus = React.createClass({
  getInitialState() {
    return {
      repairStatus: this.props.status,
      updateError: false,
    }
  },

  propTypes: {
    statusChanged: React.PropTypes.func,
    propertyId: React.PropTypes.number,
    requestId: React.PropTypes.number,
    status: React.PropTypes.string, //current status
  },

  onButtonClick() {
    this.refs.dialog.show();
  },

  // Update select menu on change.
  onSelectChange(event, selectedUserTypeIndex) {
    var repairStatus = statusTypes[selectedUserTypeIndex].name;
    this.setState({ 
      repairStatus: repairStatus,
    });
  },

  // Handle the form submission event when the user updates repair request.
  onSubmit(event) {

    // API call to update repair request status
    Api.updateRepairRequest({
      data: {
        repairStatus: this.state.repairStatus,
        requestId: this.props.requestId,
        propertyId: this.props.propertyId,
      },
      callback: (err, response) => {
        if (err) {
          this.setState({ updateError: true });
          return;
        }
        // Clear 
        this.setState({
          repairStatus: '',
        });
        this.props.statusChanged();
        this.refs.dialog.dismiss();
      }
    });
  },

  render() {
    var { repairStatus, updateError } = this.state;

    //Error message during update.
    var updateError = updateError ? (
      <ErrorMessage>Error during update. Please try again</ErrorMessage>
    ) : null;

    var standardActions = [
      { text: 'Cancel' },
      { text: 'Change Status', onTouchTap: this.onSubmit, ref: 'submit' }
    ];
    return (
      <div style={style.formContainer}>
        <RaisedButton label="Change Status"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Change Status"
          actions={standardActions}
          actionFocus="submit"
          ref="dialog">
          <div style={style.form}>
          <div>{updateError}</div>
            <div>
            <SelectField
              value={repairStatus}
              valueMember="name"
              floatingLabelText="Repair Request Status"
              onChange={this.onSelectChange}
              menuItems={statusTypes} />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
});

// request status types
var statusTypes = [
  {name: 'Submitted', text: 'Submitted'},
  {name: 'Pending', text: 'Pending'},
  {name: 'Approved', text: 'Approved'},
  {name: 'Declined', text: 'Declined'},
];

var style = {
  formContainer: {
    width: '325px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '11em',
    maxWidth: '20em',
  }
};

module.exports = MuiContextified(OwnerRepairRequestStatus);
