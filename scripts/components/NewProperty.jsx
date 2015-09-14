var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var NewPropertyForm = require('./NewPropertyForm.jsx');

var NewProperty = React.createClass({
  render() {
    return (
      <div style={style.page}>
        <div style={style.row}>
          <div style={style.col}>
            <NewPropertyForm newPropertyAdded={console.log('Replace With Transition')}/>
          </div>
        </div>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  col: {
    width: '50%',
  }
};

module.exports = MuiContextified(NewProperty);
