var React = require('react');
var Radium = require('radium');
var Moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUi = require('material-ui');
var MenuItem = require('material-ui/lib/menus/menu-item');
var IconMenu = MaterialUi.IconMenu;
var ListItem = MaterialUi.ListItem;
var ListDivider = MaterialUi.ListDivider;
var IconButton = MaterialUi.IconButton;
var Dialog = MaterialUi.Dialog;
var FlatButton = MaterialUi.FlatButton;
var Label = require('./Label.jsx');

var CalendarEditEventForm = require('./CalendarEditEventForm.jsx');

var CalendarListItem = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired,
    refresh: React.PropTypes.func, // Refresh the Agent Calendar
  },

  getInitialState() {
    return {
      isEditDialogOpen: false,
    };
  },

  showEventDialog() {
    this.refs.dialog.show();
  },


  editDialogDismissed(eventTitle) {
    this.setState({ isEditDialogOpen: false });
  },

  deleteEvent() {
    var event = this.props.event
    Api.deleteEvent({
      eventId: event.id,
      callback: (err, response) => {
        if (err) return console.log(err);
        this.refs.deleteDialog.dismiss();
        this.props.refresh('Event "' + event.event + '" has been deleted.');
      }
    });
  },

  showRemoveDialog() {
    this.refs.deleteDialog.show();
  },

  dismissDeleteDialog() {
    this.refs.deleteDialog.dismiss();
  },

  onShowEditDialog() {
    this.setState({ isEditDialogOpen: true });
  },

  onCloseEditDialog() {
    this.setState({ isEditDialogOpen: false });
  },

  onEventEdited(eventTitle) {
    this.setState({ isEditDialogOpen: false });
    this.props.refresh('Event "' + eventTitle + '" Updated.');
  },

  render() {
    var standardActions = [
      { text: 'Close' }
    ];
    var deleteActions = [
      <FlatButton key="cancel" label="Cancel" secondary={true} onTouchTap={this.dismissDeleteDialog} />,
      <FlatButton key="delete" label="Delete" primary={true} onTouchTap={this.deleteEvent} />
    ];
    let iconButtonElement = <IconButton iconClassName="material-icons">more_vert</IconButton>;
    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem primaryText="Edit" onTouchTap={this.onShowEditDialog} />
        <MenuItem style={style.rightMenuDelete} onTouchTap={this.showRemoveDialog} primaryText="Delete" />
      </IconMenu>
    );

    var item = this.props.event; // An event item object

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
          onTouchTap={this.showEventDialog}
          style={(Moment(item.date).isBefore(Moment(), 'day')) ? style.past : '' }/>
        <ListDivider inset={false} />
        <Dialog title={item.event} actions={standardActions} ref='dialog'>
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
        <CalendarEditEventForm
          isOpen={this.state.isEditDialogOpen}
          onClose={this.onCloseEditDialog}
          details={item}
          onEventDetailsUpdated={this.onEventEdited} />
      </div>
    );
  }
});

var style = {
  past: {
    color: 'rgba(0, 0, 0, 0.54)',
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
