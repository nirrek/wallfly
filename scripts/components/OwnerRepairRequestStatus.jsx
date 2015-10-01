var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var SelectField = mui.SelectField;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;

var OwnerRepairRequestStatus = React.createClass({
  getInitialState() {
    return {
      repairStatus: '',
    }
  },

  propTypes: {
    changeStatus: React.propTypes.func, 
  }

  onButtonClick() {
    this.refs.dialog.show();
  },

  // Update select menu on change.
  onSelectChange(event, selectedUserTypeIndex) {
    var repairStatus = stats[selectedUserTypeIndex].name;
    this.setState({ repairStatus: repairStatus });
  },

  // Handle the form submission event when the user adds new repair request.
  onSubmit(event) {

    Api.updateRepairRequestStatus({
      data: {
        status: this.state.status,
      },
      callback: (err, res) => {
        if (err) {
          return;
        }
        this.setState({
          repairStatus: '',
        });

        this.refs.dialog.dismiss();
      }
    });
  },

  render() {
    var { repairStatus } = this.state;
    var errorMessage;
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
          modal={this.state.modal}
          ref="dialog">
          <div style={style.form}>
            <div style={style.error}> { errorMessage } </div>
            <div>
            <SelectField
              value={repairStatus}
              valueMember="name"
              floatingLabelText="OwnerRepairRequestStatus"
              onChange={this.onSelectChange}
              menuItems={stats} />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
});

// User types
var stats = [
  {name: 'Submitted', text: 'Submitted'},
  {name: 'Pending', text: 'Pending'},
  {name: 'Approved', text: 'Approved'},
  {name: 'Declined', text: 'Declined'},
];

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  formContainer: {
    width: '325px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  date: {
    width: '2em',
  },
  separator: {
    margin: '0 .5em',
  },
  ccv: {
    width: '3em',
  }
};

module.exports = MuiContextified(OwnerRepairRequestStatus);
