var React = require('react');
var axios = require('axios');
var config = require('../utils/config.js');
var moment = require('moment');

// simulate a user Store
var user = {
  id: 5,
}

var Payments = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
    };
  },

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
  },

  render() {
    var rows = this.state.payments.map(payment => {
      return (
        <tr>
          <td>{moment(payment.date).format('Do MMM YYYY')}</td>
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
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
};

export default Payments;
