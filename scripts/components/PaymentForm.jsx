var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;

var PaymentForm = React.createClass({
  getInitialState() {
    return {
      fullName: '', // user entered full name on credit card
      cardNumber: '', // user entered credit card number
      expiryDate: '', // user entered expiry date
      ccv: '', // user entered ccv number
      amount: '', // user entered amount
    }
  },

  propTypes: {
    paymentAdded: React.PropTypes.func,
  },

  onButtonClick() {
    this.refs.dialog.show();
  },

  // Capture the input field state after each keypress.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Handle the form submission event when the user adds new repair request.
  onSubmit(event) {

    // API call to add payment
    Api.addPayment({
      data: {
        // fullName: this.state.fullName,
        // cardNumber: this.state.cardNumber,
        // expiryDate: this.state.expiryDate,
        // ccv: this.state.ccv,
        amount: this.state.amount
      },
      callback: (err, response) => {
        if (err) {
          return;
        }
        // Clear the form
        this.setState({
          fullName: '',
          cardNumber: '',
          expiryDate: '',
          ccv: '',
          amount: ''

        });
        this.props.paymentAdded();
        this.refs.dialog.dismiss();
      }
    });
  },

  render() {
    var { fullName, cardNumber, expiryDate, ccv, amount } = this.state;
    var errorMessage;
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Make Payment', onTouchTap: this.onSubmit, ref: 'submit' }
    ];
    return (
      <div style={style.formContainer}>
        <RaisedButton label="Make a new Payment"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Make a Payment"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
          ref="dialog">
          <div style={style.error}> { errorMessage } </div>
          <TextField
            value={fullName}
            onChange={this.onChange.bind(this, 'fullName')}
            floatingLabelText="Full Name on Credit Card" />
          <TextField
            value={cardNumber}
            onChange={this.onChange.bind(this, 'cardNumber')}
            floatingLabelText="Card Number" />
          <DatePicker
            name="expiryDate"
            onChange={this._handleChange}
            floatingLabelText="Expiry Date"/>
          <TextField
            value={ccv}
            onChange={this.onChange.bind(this, 'ccv')}
            floatingLabelText="CCV" />
          <TextField
            value={amount}
            onChange={this.onChange.bind(this, 'amount')}
            floatingLabelText="Amount" />
        </Dialog>
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
  formContainer: {
    width: '325px',
  },
  form: {
    display: 'flex',
    padding: '2em',
    flexDirection: 'column',
    maxWidth: '20em',
  },
};

module.exports = MuiContextified(PaymentForm);
