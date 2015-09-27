var React = require('react');
var ErrorMessage = require('./ErrorMessage.jsx');

/**
 * JoiError component consumes a Joi validation object, and pretty
 * prints a list of what fields failed validation.
 * @param  {Object} error This must be a Joi result object returned from an
 *                        unsuccessful validation call.
 */
var JoiError = React.createClass({
  propTypes: {
    error: React.PropTypes.shape({
      error: React.PropTypes.instanceOf(Error),
      value: React.PropTypes.object,
    }).isRequired,
  },

  render() {
    var { error } = this.props;

    return (
      <ErrorMessage>
        Validation Errors: <br />
        <ul>
          { error.details.map(error =>
            <li key={error.context.key}>{error.message}</li>) }
        </ul>
      </ErrorMessage>
    );
  }
});

module.exports = JoiError;
