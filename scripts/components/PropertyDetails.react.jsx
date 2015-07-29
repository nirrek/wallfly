import React from 'react';

class PropertyDetails extends React.Component {
  render() {
    // Model a rehydrated JSON response
    let ownerRowData = [
      { name: {content: 'Daniel Chung'}, phone: {content: '0432 123 123'}, email: {content: 'chung@chung.com'} }
    ];

    return (
      <div style={style.page}>{/*
        <img src='https://a2.muscache.com/ac/pictures/95378706/b19f1c99_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70' /> */}
        <img style={{maxHeight: 300}} src='https://a0.muscache.com/ac/pictures/95378706/b19f1c99_original.jpg?interpolation=lanczos-none&size=xx_large&output-format=jpg&output-quality=70' />

        <div>
          <h3>Owner</h3>
          <table>
            <tr>
              <td>Name</td>
              <td>Daniel Chung</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>0432 123 123</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>dchung@gmail.com</td>
            </tr>
          </table>
        </div>

        <div>
          <h3>Agent</h3>
          <table>
            <tr>
              <td>Name</td>
              <td>Mr Agent</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>0432 123 123</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>agent@agency.com</td>
            </tr>
          </table>
        </div>

        <div>
          <h3>Tenant</h3>
          <table>
            <tr>
              <td>Name</td>
              <td>Ben Park</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>0432 123 123</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>bpark@gmail.com</td>
            </tr>
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
