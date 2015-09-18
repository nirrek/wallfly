var React = require('react');

var ErrorMessage = React.createClass({
  propTypes: {
    fillBackground: React.PropTypes.bool, // filled bg style.
  },

  render() {
    var containerStyle = (this.props.fillBackground) ? style.containerFilled
                                                     : style.container;

    return (
      <div style={containerStyle}>
        <div style={style.text}>{this.props.children}</div>
      </div>
    );
  }
});

var style = {
  container: {
    margin: '.5em 0',
  },
  containerFilled: {
    backgroundColor: 'rgba(238, 64, 60, 0.06)',
    padding: '1em',
    margin: '1em 0',
    borderRadius: '4px',
    border: '1px solid rgba(252, 81, 67, 0.08)',
  },
  text: {
    color: '#EE403C'
  }
}

module.exports = ErrorMessage;
