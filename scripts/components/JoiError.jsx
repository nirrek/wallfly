var React = require('react');
var ErrorMessage = require('./ErrorMessage.jsx');
var Radium = require('radium');

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
    fillBackground: React.PropTypes.bool,
  },

  render() {
    var { error } = this.props;

    return (
      <ErrorMessage fillBackground={this.props.fillBackground}>
        Validation Errors: <br />
        <ul style={styles.list}>
          { error.details.map((error, idx) =>
            <li key={error.context.key + idx}>{error.message}</li>) }
        </ul>
      </ErrorMessage>
    );
  }
});

var styles = {
  list: {
    marginTop: 0,
  }
};

module.exports = Radium(JoiError);
