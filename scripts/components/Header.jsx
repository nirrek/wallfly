var React = require('react');
var materialUi = require('material-ui');
var IconButton = materialUi.IconButton;
var IconMenu = materialUi.IconMenu;
var MenuItem = require('material-ui/lib/menus/menu-item');
var Api = require('../utils/Api.js');
var Navigation = require('react-router').Navigation;
var UserProfile = require('./UserProfile.js');
var User = require('../utils/User.js');
var Property = require('../utils/Property.js');
var Radium = require('radium');

/**
 * Header Component.
 * The header component is the main site header at the top of the view.
 */
var Header = React.createClass({
  mixins: [ Navigation ],

  propTypes: {
    // Callback when the the menu icon is toggled by the user.
    onMenuClick: React.PropTypes.func,
    isMenuDocked: React.PropTypes.bool,
    isBasic: React.PropTypes.bool, // basic lacks app-like controls.
  },

  getDefaultProps() {
    return { isBasic: false };
  },

  getInitialState() {
    return { isProfileOpen: false, };
  },

  onProfileClick() { this.setState({ isProfileOpen: true }); },

  onProfileClose() { this.setState({ isProfileOpen: false }); },

  onLogoutClick() {
    Api.logout({
      callback: (err, res) => {
        if (err) {
          return;
        }

        // Remove local user model and redirect.
        User.deleteUser();
        Property.deleteProperty();
        this.transitionTo('/');
      }
    });
  },

  onLogoClick() {
    this.transitionTo('/');
  },

  render() {
    var { onMenuClick, isMenuDocked, isBasic } = this.props;

    var menuIcon = null;
    if (!isMenuDocked) {
      menuIcon = (
        <IconButton onClick={onMenuClick}
                    iconClassName="material-icons"
                    iconStyle={styles.icon}>
          menu
        </IconButton>
      );
    }

    if (isBasic) {
      return (
        <div style={[styles.header, styles.basic]}>
          <img
            onClick={this.onLogoClick}
            style={styles.logo}
            src={require('../../assets/logotype.svg')} />
        </div>
      );
    } else {
      var settingsIcon = <IconButton iconStyle={styles.icon} iconClassName="material-icons">settings</IconButton>;
      var profileIcon = <IconButton iconStyle={styles.darkIcon} iconClassName="material-icons">account_circle</IconButton>;
      var logoutIcon = <IconButton iconStyle={styles.darkIcon} iconClassName="material-icons">exit_to_app</IconButton>;

      return (
        <div style={styles.header}>
          {menuIcon}
          <div style={styles.logoContainer}>
            <img
              style={[styles.logo, styles.logoApp]}
              src={require('../../assets/logotype.svg')} />
          </div>
          {/* <div style={styles.logo}>WallFly</div> */}
          <IconMenu iconButtonElement={settingsIcon}>
            <MenuItem onClick={this.onProfileClick} leftIcon={profileIcon} primaryText="View Your Profile" />
            <MenuItem onClick={this.onLogoutClick} leftIcon={logoutIcon} primaryText="Logout" />
          </IconMenu>

          <UserProfile isOpen={this.state.isProfileOpen}
                       onClose={this.onProfileClose}/>
        </div>
      );
    }
  }
});

var styles = {
  header: {
    backgroundColor: '#2ECC71',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  basic: {
    justifyContent: 'center',
  },
  logo: {
    height: 37,
    marginTop: -1,
    textAlign: 'center',
    filter: 'drop-shadow(0 1px 0 rgba(0,0,0,.1))',
    ':hover': {
      cursor: 'pointer',
    }
  },
  logoApp: { // in app logo
    ':hover': {
      cursor: 'default',
    }
  },
  logoContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    color: '#fff',
    textShadow: '0 1px 1px rgba(0,0,0, .2)',
  },
  darkIcon: {
    color: '#333',
  }
};

module.exports = Radium(Header);
