var React = require('react');
var materialUi = require('material-ui');
var FontIcon = materialUi.FontIcon;
var IconButton = materialUi.IconButton;
var NavigationMenu = materialUi.NavigationMenu;

/**
 * Header Component.
 * The header component is the main site header at the top of the view.
 */
var Header = React.createClass({
  propTypes: {
    // Callback when the the menu icon is toggled by the user.
    onMenuClick: React.PropTypes.func.isRequired,
    isMenuDocked: React.PropTypes.bool.isRequired,
    isBasic: React.PropTypes.bool, // basic lacks app-like controls.
  },

  getDefaultProps() {
    isBasic: false
  },

  render() {
    let { onMenuClick, isMenuDocked, isBasic } = this.props;

    let menuIcon = null;
    if (!isMenuDocked) {
      menuIcon = (
        <IconButton onClick={onMenuClick}
                    iconClassName="material-icons"
                    iconStyle={styles.icon}>
          menu
        </IconButton>
      )
    }

    if (isBasic) {
      return (
        <div style={styles.header}>
          <div style={styles.logo}>WallFly</div>
        </div>
      );
    } else {
      return (
        <div style={styles.header}>
          {menuIcon}
          <div style={styles.logo}>WallFly</div>
          {/* TODO add notifications and settings
          <IconButton iconStyle={styles.icon} iconClassName="material-icons">notifications</IconButton>
          <IconButton iconStyle={styles.icon} iconClassName="material-icons">settings</IconButton> */}
        </div>
      );
    }
  }
});

var styles = {
  header: {
    // backgroundImage: 'linear-gradient(45deg, #5FCF93, #2ECC71)',
    backgroundColor: '#2ECC71',
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    flex: 1, // expand to fill available space
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    letterSpacing: -1,
    fontWeight: 900,
    textShadow: '0 1px 1px rgba(0,0,0, .3)',
    textTransform: 'uppercase',
  },
  icon: {
    color: '#fff',
    textShadow: '0 1px 1px rgba(0,0,0, .2)',
  }
}

module.exports = Header;
