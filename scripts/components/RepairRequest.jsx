var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var RepairRequestForm = require('./RepairRequestForm.jsx');
var Radium = require('radium');
<<<<<<< HEAD
var RepairRequestImages = require('./RepairRequestImages.jsx');
=======
var PageHeading = require('./PageHeading.jsx');
>>>>>>> master

var RepairRequest = React.createClass({
  getInitialState() {
    return {
      repairRequests: [], // list of repair requests
    };
  },

  getRepairRequests() {
    Api.getRepairRequests({
      callback: (err, response) => {
        if (err) {
          // TODO
          return console.log(err);
        }

        this.setState({
          repairRequests: response.data
        });
      }
    });
  },

  componentWillMount() {
    this.getRepairRequests();
  },

  render() {
    var { repairRequests } = this.state;

    var rows = repairRequests.map(request => {
      return (
        <tr key={request.id}>
          <td>{moment(request.date).format('Do MMM YYYY')}</td>
          <td>{request.request}</td>
          <td>
<<<<<<< HEAD
          <RepairRequestImages requestId={request.id}/>
=======
            {request.photo ?
              ( <img style={style.img} src={request.photo} /> ) :
              ( <i>No image added</i> )}
>>>>>>> master
          </td>
          <td>{request.status}</td>
        </tr>
      );
    });

    // No repair requests
    if (rows.length === 0) {
      rows = (
        <tr>
          <td style={style.center} colSpan="4">No repair requests yet</td>
        </tr>
      );
    }

    return (
      <div style={style.page}>
        <PageHeading>Repair Requests</PageHeading>
        <table>
          <colgroup style={{width: 140}}></colgroup>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <div style={style.formContainer}>
          <RepairRequestForm repairRequestAdded={this.getRepairRequests} />
          
        </div>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
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
<<<<<<< HEAD
  image: {
    maxHeight: '7em',
  },
=======
  img: {
    maxWidth: 150,
    borderRadius: 4,
  },
  center: {
    textAlign: 'center',
  }
>>>>>>> master
};

module.exports = MuiContextified(Radium(RepairRequest));
