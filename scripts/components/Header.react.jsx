import React from 'react';
import { FontIcon, IconButton, NavigationMenu } from 'material-ui';

class Header extends React.Component {
  static propTypes = {
    // Callback when the the menu icon is toggled by the user.
    onMenuClick: React.PropTypes.func.isRequired,
    isMenuDocked: React.PropTypes.bool.isRequired,
  }

  onClick() {
    alert('hey');
  }

  render() {
    let { onMenuClick, isMenuDocked } = this.props;

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

    return (
      <div style={styles.header}>
        {menuIcon}
        <div style={styles.logo}>WallFly</div>
        <IconButton iconStyle={styles.icon} iconClassName="material-icons">notifications</IconButton>
        <IconButton iconStyle={styles.icon} iconClassName="material-icons">settings</IconButton>

      </div>
      // <AppBar
      //   title="Title"
      //   showMenuIconButton={!isMenuDocked}
      //   iconClassNameRight="muidocs-icon-navigation-expand-more"
      //   onLeftIconButtonTouchTap={onMenuToggle}/>
    );
  }
}

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

export default Header;
