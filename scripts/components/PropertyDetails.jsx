var React = require('react');
var Api = require('../utils/Api.js');
var MaterialUi = require('material-ui');
var MuiContextified = require('./MuiContextified.jsx');
var Property = require('../utils/Property.js');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var FontIcon = MaterialUi.FontIcon;
var User = require('../utils/User.js');

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
      userType: '',
    };
  },

  componentWillMount() {
    this.setState({ userType: User.getUser().type });

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

  generateDetails(details) {
    return details.map(row => {
      return (
        <div style={style.details}>
          <FontIcon style={style.icon} className="material-icons">{row.icon}</FontIcon>
          <span style={style.detail}>{row.value}</span>
        </div>
      );
    });
  },

  render() {

    var ownerDetailRows = [
      { icon: 'person', value: `${this.state.ownerFN} ${this.state.ownerLN}` },
      { icon: 'phone', value: this.state.ownerPhone },
      { icon: 'email', value: this.state.ownerEmail },
    ];

    var agentDetailRows = [
      { icon: 'person', value: `${this.state.agentFN} ${this.state.agentLN}` },
      { icon: 'phone', value: this.state.agentPhone },
      { icon: 'email', value: this.state.agentEmail },
    ];

    var tenantDetailRows = [
      { icon: 'person', value: `${this.state.tenantFN} ${this.state.tenantLN}` },
      { icon: 'phone', value: this.state.tenantPhone },
      { icon: 'email', value: this.state.tenantEmail },
    ];

    var { photo, street, suburb, userType } = this.state;
    var photoBg = photo ? {
      backgroundImage: `url(${photo})`,
      backgroundSize: 'cover',
    } : null;

    return (
      <div style={style.page}>
        <PageHeading>Property Details</PageHeading>

        <div style={style.pocket}>
          <div style={[
              style.img,
              photoBg
            ]}></div>
          <div style={style.section}>
            <div style={style.street}>{street}</div>
            <div style={style.suburb}>{suburb}</div>
          </div>

          <div style={[style.section, style.noPadding]}>
            <div style={style.keyValuePair}>
              <div style={style.key}>Managing Agent</div>
              <div style={style.value}>
                { this.generateDetails(agentDetailRows) }
              </div>
            </div>
          </div>

          { userType !== 'owner' ? (
            <div style={[style.section, style.noPadding]}>
              <div style={style.keyValuePair}>
                <div style={style.key}>Current Tenant</div>
                <div style={style.value}>
                  { this.generateDetails(tenantDetailRows) }
                </div>
              </div>
            </div>
          ) : null }

          { userType !== 'tenant' ? (
            <div style={[style.section, style.noPadding]}>
              <div style={style.keyValuePair}>
                <div style={style.key}>Owner</div>
                <div style={style.value}>
                  { this.generateDetails(ownerDetailRows) }
                </div>
              </div>
            </div>
          ) : null }

        </div>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  pocket: {
    width: 400,
    borderRadius: 4,
    boxShadow: '0 1px 3px rgba(0,0,0,.3)',
    marginBottom: '5em',
  },
  street: {
    fontSize: 25,
  },
  suburb: {
    marginTop: -5,
    color: '#888'
  },
  img: {
    borderRadius: '4px 4px 0 0',
    boxShadow: 'inset 0 0 50px rgba(0,0,0,.7), -1px 0 1px rgba(0,0,0,.3), 1px 0 1px rgba(0,0,0,.3), inset 0 0 1px rgba(0,0,0, .9)',
    width: '100%',
    height: 250,
  },
  section: {
    padding: '1em',
  },
  keyValuePair: {
    borderTop: '2px solid #ddd',
    padding: '1em 0',
    display: 'flex',
  },
  key: {
    color: '#888',
    flex: '1 0 none',
    width: '50%',
    fontSize: 14,
    paddingTop: 3,
  },
  value: {
    flex: '1 0 none'
  },
  noPadding: {
    padding: '0 1em 1em 1em',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '2em',
    fontSize: 14,
    color: '#333',
  },
  detail: {
    paddingLeft: '1em',
  },
  icon: {
    color: '#555',
  }
};

module.exports = MuiContextified(Radium(PropertyDetails));
