var React = require('react');
var Api = require('../utils/Api.js');
var moment = require('moment');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');

var OwnerPayments = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
    };
  },

  componentWillMount() {
    var { propertyId } = this.props.params;

    Api.getPropertyPayments({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        this.setState({ payments: response.data });
      }
    });
  },

  render() {
    var rows = this.state.payments.map(payment => {
      return (
        <tr key={payment.id}>
          <td>{moment(payment.date).format('Do MMM YYYY')}</td>
          <td>{payment.propertyId}</td>
          <td>${payment.amount}</td>
        </tr>
      );
    });

    return (
      <div style={style.container}>
        <PageHeading>Payments</PageHeading>
        <table>
          <thead>
            <th>Date</th>
            <th>Property</th>
            <th>Amount</th>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
});

var style = {
  container: {
    display: 'flex',
    flexFlow: 'column',
  },
  header: {
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'left',
  },
};

module.exports = Radium(OwnerPayments);
