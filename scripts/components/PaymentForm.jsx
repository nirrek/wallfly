var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;

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
        newDataAdded:   React.PropTypes.func,
  },

  // Capture the input field state after each keypress.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Handle the form submission event when the user adds new payment.
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

      // API call to add payment.
    Api.addPayment({
      data: {
        date: this.refs.DatePicker.getDate(),
        property: this.state.property,
        amount: this.state.amount
      },
      callback: (err, response) => {
        if (err) {
          return;
        }
        // Clear the form
        this.setState({
          date: "",
          property: "",
          amount: ""
        });

        this.props.newDataAdded();
      }
    });

  },

  render() {
    var { fullName, cardNumber, ccv, amount } = this.state;
    var errorMessage;
    var currentDate = new Date();
    return (
      <div style={style.formContainer}>
        <h2 style={style.heading}>Make a Payment </h2>
        <Paper zDepth={1}>
          <form style={style.form} onSubmit={this.onSubmit}>
            <TextField
              value={fullName}
              name="Full Name on Credit Card"
              onChange={this.onChange.bind(this, 'fullName')}
              floatingLabelText="Full Name on Credit Card" />
            <TextField
              value={cardNumber}
              name="Card Number"
              onChange={this.onChange.bind(this, 'cardNumber')}
              floatingLabelText="Card Number" />
            <DatePicker
              name="expiryDate"
              ref="DatePicker"
              //TODO: set default date, changing date with selected date
              onChange={this._handleChange}
              floatingLabelText="Expiry Date"/>
            <TextField
              value={ccv}
              name="Ccv"
              onChange={this.onChange.bind(this, 'ccv')}
              floatingLabelText="CCV" />
            <TextField
              value={amount}
              name="Amount"
              onChange={this.onChange.bind(this, 'amount')}
              floatingLabelText="Amount" />
            <RaisedButton
              type="submit"
              label="Pay"
              primary={true}
              backgroundColor="#2ECC71"
              style={style.button} />
          </form>
        </Paper>
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