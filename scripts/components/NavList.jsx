var React = require('react');
var Navigation = require('react-router').Navigation;
var MaterialUi = require('material-ui');
var List = MaterialUi.List;
var ListItem = MaterialUi.ListItem;
var FontIcon = MaterialUi.FontIcon;

var NavList = React.createClass({
  mixins: [ Navigation ],

  propTypes: {
    items: React.PropTypes.object.isRequired,
  },

  render() {
    var { items } = this.props;

    var navItems = items.map(item => {
      var icon = <FontIcon className='material-icons'>{item.icon}</FontIcon>
      return (
        <ListItem key={item.text}
                  primaryText={item.text}
                  leftIcon={icon}
                  onClick={() => this.transitionTo(item.path)} />
      );
    });

    return <List>{navItems}</List>;
  }

});

module.exports = NavList;
