import React from 'react';

class InspectionReport extends React.Component {
  render() {
    let data = [
      {
        date: '05-05-2015',
        inspector: 'Mr Agent',
        comment: 'Water tank is leaking, and there are some cracks in the ceiling',
        image: 'http://www.waterheaterrepairbridgeportct.com/wp-content/uploads/2013/08/water-heater-leaking.jpg',
      }
    ];

    let rows = data.map(data => {
      return (
        <tr>
          <td>{data.date}</td>
          <td>{data.inspector}</td>
          <td>{data.comment}</td>
          <td><img src={data.image} /></td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <table>
          <tr>
            <th>Date</th>
            <th>Inspector</th>
            <th>Comment</th>
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

export default InspectionReport;
