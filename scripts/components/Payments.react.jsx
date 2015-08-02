import React from 'react';
var axios = require('axios');
var fecha = require('fecha');
var config = require('../utils/config.js');

// simulate a user Store
var user = {
  id: 5,
}

class Payments extends React.Component {
  state = {
    payments: [], // list of recent payments
  }

  componentWillMount() {
    axios.get(`${config.server}/users/${user.id}/payments`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        this.setState({
          payments: response.data
        });
        console.log(response.data);
      })
      .catch((response) => {
        // TODO - read up on error handling
        console.log(response);
      });
  }

  render() {
    let rows = this.state.payments.map(payment => {
      return (
        <tr>
          <td>{fecha.format(new Date(payment.date), 'Do MMM YYYY')}</td>
          <td>{payment.property}</td>
          <td>{payment.amount}</td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <h1>Payment History</h1>
        <table>
          <tr>
            <th>Date</th>
            <th>Property</th>
            <th>Amount</th>
          </tr>
          {rows}
        </table>
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

export default Payments;
