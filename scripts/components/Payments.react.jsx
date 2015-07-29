import React from 'react';

class Payments extends React.Component {
  render() {
    let rows = [1, 2, 3, 4, 5, 6, 7].sort((a, b) => b - a).map(month => {
      return (
        <tr>
          <td>02-0{month}-2015</td>
          <td>Ben Park</td>
          <td>$600</td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <h1>Payment History</h1>
        <table>
          <tr>
            <th>Date</th>
            <th>Tenant</th>
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
