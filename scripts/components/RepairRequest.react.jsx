import React from 'react';

class RepairRequest extends React.Component {
  render() {
    let data = [
      {
        date: '05-05-2015',
        subject: 'Leaking water tank',
        request: 'Hi can you fix up the water tank? The water tank is leaking' +
                 'since yesterday. Thank you.',
        image: 'http://www.waterheaterrepairbridgeportct.com/wp-content/uploads/2013/08/water-heater-leaking.jpg',
      }
    ];

    let rows = data.map(data => {
      return (
        <tr>
          <td>{data.date}</td>
          <td>{data.subject}</td>
          <td>{data.request}</td>
          <td><img src={data.image} /></td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <table>
          <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Request</th>
            <th>Image</th>
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

export default RepairRequest;
