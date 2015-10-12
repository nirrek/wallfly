var React = require('react');
var Radium = require('radium');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var Label = require('./Label.jsx');

/**
 * Event Item
 * This is a event item that is located in an event List.
 */

var EventItem = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  showEventDialog() {
    this.refs.dialog.show();

  },

  render() {
    var event = this.props.data;
    let standardActions = [
      { text: 'Close' }
    ];

    return (
      <div>
        <div
          onClick={this.showEventDialog}
          style={style.eventItem}>
          <strong>{event.date.format('h:mma')}</strong>&nbsp;
          {event.event}
        </div>
        <Dialog
          title={event.event}
          actions={standardActions}
          ref='dialog'>
          <Label>Date</Label>
          {event.date.format('DD/MM/YYYY — hh:mm A')}
          <Label>Notes</Label>
          {event.notes}
        </Dialog>
      </div>
    );
  },
});

var style = {
  eventItem: {
    textAlign: 'left',
    fontSize: '0.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
}

module.exports = Radium(MuiContextified(EventItem));
