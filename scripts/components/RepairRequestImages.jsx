var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var Radium = require('radium');
var RepairRequestAddImage = require('./RepairRequestAddImage.jsx');

var RepairRequestImages = React.createClass({

  propTypes: {
    images: React.PropTypes.array.isRequired,
    refresh: React.PropTypes.func,
  },

  render() {
    var rows = this.props.images.map((request, index) => {
      return (
        <tr key={index}>
          <td>
            {request.photo ?
              ( <img style={style.img} src={request.photo} /> ) :
              ( <i>No image added</i> )}
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table style={style.table}>
          {rows}
        </table>
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
  table: {
    marginBottom: '10px'
  },
  img: {
    maxWidth: 200,
    borderRadius: 4,
  },
};

module.exports = Radium(MuiContextified(RepairRequestImages));
