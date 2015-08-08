import React from 'react';
var axios = require('axios');
var config = require('../utils/config.js');

// simulate a user Store
var user = {
  id: 5,
}

class PropertyDetails extends React.Component {
  state = {
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
  }

  componentWillMount() {
    console.log('mounting');
    axios.get(`${config.server}/users/${user.id}/property`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        // Having the state object coupled to the response object shape
        // might be annoying to reason about. Explitness may be preferable.
        this.setState(response.data, () => console.log(this.state));
        console.log(response.data);
      })
      .catch((response) => {
        // TODO - read up on error handling
        console.log(response);
      });
  }

  render() {

    let ownerDetailRows = [
      { header: 'Name', value: `${this.state.ownerFN} ${this.state.ownerLN}` },
      { header: 'Phone', value: this.state.ownerPhone },
      { header: 'Email', value: this.state.ownerEmail },
    ];

    let agentDetailRows = [
      { header: 'Name', value: `${this.state.agentFN} ${this.state.agentLN}` },
      { header: 'Phone', value: this.state.agentPhone },
      { header: 'Email', value: this.state.agentEmail },
    ];

    let tenantDetailRows = [
      { header: 'Name', value: `${this.state.tenantFN} ${this.state.tenantLN}` },
      { header: 'Phone', value: this.state.tenantPhone },
      { header: 'Email', value: this.state.tenantEmail },
    ]

    console.log(ownerDetailRows);

    let ownerDetails = ownerDetailRows.map(row => {

    })

    return (
      <div style={style.page}>
        <img width="400" src={this.state.photo} />

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
}

let style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
};

export default PropertyDetails;
