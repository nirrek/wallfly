var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var Radium = require('radium');

var RepairRequestImages = React.createClass({
  getInitialState() {
    return {
      repairRequestImages: [], // list of repair requests
    };
  },

  propTypes: {
    requestId: React.PropTypes.number,
  },

  getRepairRequestImages() {
    Api.getRepairRequestImages({
      data: {
        requestId: this.props.requestId,
      },
      callback: (err, response) => {
        if (err) {
          // TODO
          return console.log(err);
        }
        this.setState({
          repairRequestImages: response.data
        });
      }
    });
  },

  componentWillMount() {
    this.getRepairRequestImages()
  },

  render() {
    var { repairRequestImages } = this.state;
    var rows = repairRequestImages.map(request => {
      return (
        <tr key={request.id}>
          <td>
            {request.photo ?
              ( <img style={style.image} src={request.photo} /> ) :
              ( <i>No image added</i> )}
          </td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <table>
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
  formContainer: {
    marginTop: '1em'
  },
  form: {
    display: 'flex',
    padding: '2em',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  image: {
    maxHeight: '7em',
  },
};

module.exports = Radium(MuiContextified(RepairRequestImages));
