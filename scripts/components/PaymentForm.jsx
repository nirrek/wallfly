var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var Label = require('./Label.jsx');
var DialogEnhanced = require('./DialogEnhanced.jsx');
var Radium = require('radium');
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');

/**
 * Payment form used by the client.
 * This form simulates a credit card form from a payment processor (eg Stripe)
 */
var PaymentForm = React.createClass({
  propTypes: {
    onPaymentSuccess: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    payment: React.PropTypes.object, // the 'payment invoid' this is paying.
    isOpen: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      onPaymentSuccess(){},
      onCancel(){},
    };
  },

  getInitialState() {
    return {
      fullName: '', // user entered full name on credit card
      cardNumber: '', // user entered credit card number
      expMonth: '',
      expYear: '',
      ccv: '', // user entered ccv number
      amount: 0,
    };
  },

  componentWillReceiveProps(props) {
    this.setState({
      amount: props.payment && props.payment.amount.toFixed(2)
    });
  },

  // Capture the input field state after each keypress.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Validate the form, returns the Joi result of the validation.
  validate() {
    return Joi.validate({
      fullName: this.state.fullName,
      cardNumber: this.state.cardNumber,
      expMonth: this.state.expMonth,
      expYear: this.state.expYear,
      ccv: this.state.ccv,
      amount: this.state.amount,
    }, schema);
  },

  // Handle the form submission event when the user adds new repair request.
  onSubmit() {
    // Clear prior error states.
    this.setState({
      validationError: false,
    });

    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    Api.putPayment({
      id: this.props.payment.id,
      payload: {
        isPaid: true,
      },
      callback: (err) => {
        if (err) {
          return console.log(err);
        }

        // Clear the form
        this.setState({
          fullName: '',
          cardNumber: '',
          ccv: '',
          expMonth: '',
          expYear: ''
        });

        this.props.onPaymentSuccess();
        this.refs.dialog.dismiss();
      }
    });
  },

  onCancel() {
    this.setState({
      validationError: false,
    });
    this.props.onCancel();
  },

  render() {
    var { fullName, cardNumber, expMonth, expYear, ccv, amount, validationError } = this.state;

    var standardActions = [
      { text: 'Cancel', onTouchTap: this.onCancel },
      { text: 'Make Payment', onTouchTap: this.onSubmit, ref: 'submit' }
    ];

    // Form validation error
    var validationError = (validationError) ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    return (
      <DialogEnhanced
        isOpen={this.props.isOpen}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
        contentStyle={{width: 375}}
        title="Pay Now"
        actions={standardActions}
        actionFocus="submit"
        modal={this.state.modal}
        ref="dialog">
        <div style={style.form}>
          { validationError }
          <TextField
            value={fullName}
            onChange={this.onChange.bind(this, 'fullName')}
            floatingLabelText="Full Name on Credit Card" />
          <TextField
            value={cardNumber}
            onChange={this.onChange.bind(this, 'cardNumber')}
            floatingLabelText="Card Number" />
          <div>
            <Label>Expiry Date</Label>
            <TextField
              style={style.date}
              value={expMonth}
              onChange={this.onChange.bind(this, 'expMonth')}
              floatingLabelText="mm"
              maxLength="2" />
            <span style={style.separator}>/</span>
            <TextField
              style={style.date}
              value={expYear}
              onChange={this.onChange.bind(this, 'expYear')}
              floatingLabelText="yy"
              maxLength="2" />
          </div>
          <TextField
            style={style.ccv}
            value={ccv}
            onChange={this.onChange.bind(this, 'ccv')}
            floatingLabelText="CCV" />
          <TextField
            value={amount}
            disabled={true}
            onChange={this.onChange.bind(this, 'amount')}
            floatingLabelText="Amount" />
        </div>
      </DialogEnhanced>
    );
  }
});

var schema = Joi.object().keys({
  fullName: Joi.string().required(),
  cardNumber: Joi.string().creditCard().required(),
  expMonth: Joi.string().length(2).required(),
  expYear: Joi.string().length(2).required(),
  ccv: Joi.string().length(3).required(),
  amount: Joi.number().integer().positive().required(),
});

var style = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  date: {
    width: '2em',
    marginTop: '-1em',
  },
  separator: {
    margin: '0 .5em',
  },
  ccv: {
    width: '3em',
  },
};

module.exports = MuiContextified(Radium(PaymentForm));
