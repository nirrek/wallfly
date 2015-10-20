var React = require('react');
var Radium = require('radium');
var Moment = require('moment');
var Api = require('../utils/Api.js');
var User = require('../utils/User.js');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUI = require('material-ui');
var MenuItem = require('material-ui/lib/menus/menu-item');
var MenuDivider = require('material-ui/lib/menus/menu-divider');
var IconMenu = MaterialUI.IconMenu;
var ListItem = MaterialUI.ListItem;
var ListDivider = MaterialUI.ListDivider;
var IconButton = MaterialUI.IconButton;
var Dialog = MaterialUI.Dialog;
var FlatButton = MaterialUI.FlatButton;
var Label = require('./Label.jsx');

var CalendarListItem = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired,
    refresh: React.PropTypes.func,
  },

  showEventDialog() {
    this.refs.dialog.show();

  },

  deleteEvent() {
    Api.deleteEvent({
      eventId: this.props.event.id,
      callback: (err, response) => {
        if (err) {
        console.log(err);
        return reply(err);
      }
        console.log("Deleting Event");
        this.refs.deleteDialog.dismiss()
        this.props.refresh();
      }
    });
  },

  showRemoveDialog() {
    this.refs.deleteDialog.show()
  },

  dismissDeleteDialog() {
    this.refs.deleteDialog.dismiss()
  },

  render() {
    var standardActions = [
      { text: 'Close' }
    ];
    var deleteActions = [
      <FlatButton label="Cancel" secondary={true} onTouchTap={this.dismissDeleteDialog} />,
      <FlatButton label="Delete" primary={true} onTouchTap={this.deleteEvent} />
    ];
    let iconButtonElement = <IconButton iconClassName="material-icons">more_vert</IconButton>
    let rightIconMenu = <IconMenu iconButtonElement={iconButtonElement}>
  <MenuItem primaryText="Edit" />
  <MenuItem style={style.rightMenuDelete} onTouchTap={this.showRemoveDialog} primaryText="Delete"  />
  <MenuItem style={style.rightMenuClose} primaryText="Close"  />
</IconMenu>

    var item = this.props.event;

    return (
      <div>
        <ListItem
          primaryText={item.event}
          secondaryText={
            <p>
              <span>{Moment(item.date).format('h:mma')} — {item.street}, {item.suburb}</span><br/>
            </p>
          }
          secondaryTextLines={1}
          rightIconButton={rightIconMenu}
          onTouchTap={this.showEventDialog} />
        <ListDivider inset={true} />
        <Dialog
          title={item.event}
          actions={standardActions}
          ref='dialog'>
          <Label>Property</Label>
          {item.street}, {item.suburb}
          <Label>Date</Label>
          {Moment(item.date).format('dddd, D MMM YYYY — h:mmA')}
          <Label>Notes</Label>
          { item.notes
            ? item.notes
            : <span style={style.noNotes}>No notes added.</span>
          }
        </Dialog>
        <Dialog title='Are you sure?' actions={deleteActions} ref='deleteDialog'>
          <div>Would you like to delete this event <strong>"{ item.event }"</strong>?</div>
        </Dialog>
      </div>
    );
  }
});

var style = {
  rightMenuClose: {
    color: '#CCC',
  },
  rightMenuDelete: {
    color: '#F65035'
  },
  noNotes: {
    color: '#ccc',
    fontStyle: 'italic',
  },

};

module.exports = MuiContextified(Radium(CalendarListItem));
