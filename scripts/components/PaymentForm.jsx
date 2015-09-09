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
      date: '', // user entered date
      property: '', // user entered property address
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
    var { date, property, amount } = this.state;
    var errorMessage;
    var currentDate = new Date();
    return (
      <div style={style.formContainer}>
        <h2 style={style.heading}>Make a Payment </h2>
        <Paper zDepth={1}>
          <form style={style.form} onSubmit={this.onSubmit}>
            <DatePicker
              name="Date"
              ref="DatePicker"
              onChange={this._handleChange}
              floatingLabelText="Date"/>
            <TextField
              value={property}
              name="Property"
              onChange={this.onChange.bind(this, 'property')}
              floatingLabelText="Property" />
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