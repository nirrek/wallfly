var React = require('react');
var Radium = require('radium');

var Label = React.createClass({
  render() {
    return (
      <label style={style.label}>
        {this.props.children}
      </label>
    );
  }
});

var style = {
  label: {
    display: 'block',
    fontSize: 16,
    color: 'rgba(0,0,0, .3)',
    marginTop: '1.5em',
  }
};

module.exports = Radium(Label);
