var React = require('react');
var Radium = require('radium');

/**
 * Screenshot Component.
 * Component for rendering a screenshot with a caption. Primarily intended
 * for use in the user guides.
 */
var Screenshot = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
  },

  render() {
    var { src, caption } = this.props;

    return (
      <div style={styles.pocket}>
        <img style={styles.img} src={require(`../../assets/${src}`)} />
        <div style={styles.caption}>
          {caption}
        </div>
      </div>
    );
  }
});

var styles = {
  pocket: {
    padding: '1em',
    borderRadius: 4,
    background: '#f0f0f0',
  },
  img: {
    width: '100%',
    borderRadius: 4,
  },
  caption: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    paddingTop: '1em',
  },
};

module.exports = Radium(Screenshot);
