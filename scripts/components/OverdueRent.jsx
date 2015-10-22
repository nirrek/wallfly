var React = require('react');
var Api = require('../utils/Api.js');
var moment = require('moment');
var MuiContextified = require('./MuiContextified.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var Status = require('./Status.jsx');

var FixedDataTable = require('fixed-data-table');
require('../../styles/fixed-data-table.css');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var OverdueRent = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
    };
  },

  componentWillMount() {
    this.fetchPayments();
  },

  fetchPayments() {
    Api.getAllPayments({
      params: {
        overdue: true,
      },
      callback: (err, res) => {
        if (err) return console.log(err);
        this.setState({ payments: res.data });
      }
    });
  },

  rowGetter(rowIndex) {
    var row = this.state.payments[rowIndex];

    return [
      moment(row.dateDue).format('Do MMM YYYY'),
      row.isPaid,
      row.description,
      `${row.street}, ${row.suburb}`,
      `$${row.amount.toFixed(2)}`,
    ];
  },

  isPaidRenderer(data) {
    var statusColor = data ? 'green' : 'red';
    return (
      <div className="public_fixedDataTableCell_cellContent">
        <Status type={statusColor}>
          {data ? 'Paid' : 'Unpaid' }
        </Status>
      </div>
    );
  },

  render() {
    // Make table 5/8 the viewport, or length of content, whichever is shorter.
    var height = Math.min((window.innerHeight * 5) / 8,
      50 * (this.state.payments.length + 1) + 2);

    return (
      <div style={style.container}>
        <PageHeading>Overdue Rent</PageHeading>
        <Table
          rowHeight={50}
          rowGetter={this.rowGetter}
          rowsCount={this.state.payments.length}
          width={705}
          height={height}
          headerHeight={50}
          footerHeight={0}
          >
          <Column
            label="Due Date"
            width={130}
            dataKey={0}
          />
          <Column
            label="Status"
            width={85}
            dataKey={1}
            cellRenderer={this.isPaidRenderer}
          />
          <Column
            label="Description"
            width={100}
            dataKey={2}
          />
          <Column
            label="Property"
            width={300}
            dataKey={3}
          />
          <Column
            label="Amount"
            width={90}
            dataKey={4}
          />
        </Table>
      </div>
    );
  }
});

var style = {
  container: {
    display: 'flex',
    flexFlow: 'column',
  },
};

module.exports = MuiContextified(Radium(OverdueRent));
