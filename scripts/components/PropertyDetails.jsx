var React = require('react');
var Api = require('../utils/Api.js');
var MaterialUi = require('material-ui');
var LinearProgress = MaterialUi.LinearProgress;
var Card = MaterialUi.Card;
var CardMedia = MaterialUi.CardMedia;
var CardTitle = MaterialUi.CardTitle;
var Paper = MaterialUi.Paper;
var Avatar = MaterialUi.Avatar;
var MuiContextified = require('./MuiContextified.jsx');
var Property = require('../utils/Property.js');
var Radium = require('radium');

var PropertyDetails = React.createClass({
  getInitialState() {
    return {
      ownerFN: '',
      ownerLN: '',
      ownerPhone: '',
      ownerEmail: '',
      agentFN: '',
      agentLN: '',
      agentPhone: '',
      agentEmail: '',
      tenantFN: '',
      tenantLN: '',
      tenantPhone: '',
      tenantEmail: '',
    };
  },

  componentWillMount() {
    if (!Property.getProperty()) {
      Api.getUserPropertyDetails({
        callback: (err, response) => {
          if (err) return console.log(err);
          this.setState(response.data);
          Property.setProperty(response.data);
        }
      });
      return;
    }

    this.setState(Property.getProperty());
  },

  render() {

    var ownerDetailRows = [
      { header: 'Name', value: `${this.state.ownerFN} ${this.state.ownerLN}` },
      { header: 'Phone', value: this.state.ownerPhone },
      { header: 'Email', value: this.state.ownerEmail },
    ];

    var agentDetailRows = [
      { header: 'Name', value: `${this.state.agentFN} ${this.state.agentLN}` },
      { header: 'Phone', value: this.state.agentPhone },
      { header: 'Email', value: this.state.agentEmail },
    ];

    var tenantDetailRows = [
      { header: 'Name', value: `${this.state.tenantFN} ${this.state.tenantLN}` },
      { header: 'Phone', value: this.state.tenantPhone },
      { header: 'Email', value: this.state.tenantEmail },
    ];

    return (
      <div style={style.page}>
        <Card style={{maxWidth: 400}}>
          <CardMedia overlay={<CardTitle title={this.state.street} subtitle={this.state.suburb}/>}>
            <img width="400" src={this.state.photo} />
          </CardMedia>
        </Card>

        <div>
          <h3>Owner</h3>
          <table>
            { ownerDetailRows.map(row => <tr><td>{row.header}</td><td>{row.value}</td></tr>) }
          </table>
        </div>

        <div>
          <h3>Agent</h3>
          <table>
            { agentDetailRows.map(row => <tr><td>{row.header}</td><td>{row.value}</td></tr>) }
          </table>
        </div>

        <div>
          <h3>Tenant</h3>
          <table>
            { tenantDetailRows.map(row => <tr><td>{row.header}</td><td>{row.value}</td></tr>) }
          </table>
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
  }
};

module.exports = Radium(MuiContextified(PropertyDetails));
