var React = require('react');
var Radium = require('radium');

/**
 * Avatar Component.
 * Used to display a user avatar.
 */
var Avatar = React.createClass({
  propTypes: {
    size: React.PropTypes.number,
    src: React.PropTypes.string.isRequired,
  },

  render() {
    var { src, size } = this.props;
    var size = size || 40; // 40px default
    var style = { borderRadius: size / 2 };

    return (
      <img src={src} width={size} height={size} style={style} />
    );
  }
});

module.exports = Radium(Avatar);
