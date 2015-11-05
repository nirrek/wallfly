var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var Radium = require('radium');
var DialogEnhanced = require('./DialogEnhanced.jsx');

/**
 * Payment Dialog for Agents/Owners.
 * Certain assumptions in the current implementation make it unsuitable
 * for use by tenant.
 */
var AddPaymentDialog = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onAddPayment: React.PropTypes.func.isRequired,
    propertyId: React.PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      amount: undefined,
      description: '',
      validationError: false, // clientside validation failure
    };
  },

  /**
   * Event handler for capturing in the input field state on each keypress.
   * @param  {String} field The identifier for the input field.
   */
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  /**
   * Adds a payment using the current state of the form.
   */
  onAddPayment() {
    // Clear prior error states.
    this.setState({
      validationError: false,
    });

    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    Api.postPayment({
      payload: {
        dateDue: new Date(), // not user selectable by agent/owner
        amount: this.state.amount,
        description: this.state.description,
        propertyId: this.props.propertyId, // from the router
      },
      callback: (err, res) => {
        if (err) return console.log(err);

        // Clear the form
        this.resetState();
        this.props.onAddPayment();
      }
    });
  },

  /**
   * Resets the state of the form.
   */
  resetState() {
    this.setState({
      amount: null,
      description: '',
      validationError: false,
    });
  },

  /**
   * Validates the form; returns the Joi result of the validation.
   * @return {Object} Joi validation object.
   */
  validate() {
    return Joi.validate({
      dateDue: new Date(),
      amount: this.state.amount,
      description: this.state.description,
      propertyId: this.props.propertyId,
    }, schema);
  },

  /**
   * Close event handler for the modal.
   */
  onClose() {
    this.resetState();
    this.props.onClose();
  },

  render() {
    var { amount, description, validationError } = this.state;

    // Form validation error
    var validationError = (validationError) ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    var actions = [
      { text: 'Cancel', onTouchTap: this.onClose },
      { text: 'Add Payment', onTouchTap: this.onAddPayment }
    ];

    return (
      <DialogEnhanced isOpen={this.props.isOpen}
                      autoScrollBodyContent={true}
                      autoDetectWindowHeight={true}
                      contentStyle={{width: 375}}
                      bodyStyle={{}}
                      actions={actions}>
        <form style={style.form}>
          { validationError }
          <TextField
            value={amount}
            onChange={this.onChange.bind(this, 'amount')}
            floatingLabelText="Amount" />
          <TextField
            value={description}
            onChange={this.onChange.bind(this, 'description')}
            floatingLabelText="Payment Description" />
        </form>
      </DialogEnhanced>
    );
  }
});

/**
 * Joi validation schema for the form.
 */
var schema = Joi.object().keys({
  dateDue: Joi.date().required(),
  amount: Joi.number().positive().required(),
  description: Joi.string().max(256).required(),
  propertyId: Joi.number().integer().positive().required(),
});

var style = {
  form: {
    display: 'flex',
    padding: '2em',
    flexDirection: 'column',
    width: '20em',
  },
};

module.exports = MuiContextified(Radium(AddPaymentDialog));
