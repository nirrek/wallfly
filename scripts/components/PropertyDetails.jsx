var React = require('react');
var MaterialUi = require('material-ui');
var MuiContextified = require('./MuiContextified.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var FontIcon = MaterialUi.FontIcon;
var RaisedButton = MaterialUi.RaisedButton;
var UpdatePropertyForm = require('./UpdatePropertyForm.jsx');
var moment = require('moment');

var PropertyDetails = React.createClass({
  propTypes: {
    userType: React.PropTypes.string.isRequired,
    onPropertyDetailsUpdated: React.PropTypes.func, // callback when details updated
    details: React.PropTypes.shape({
      id: React.PropTypes.number,
      street: React.PropTypes.string,
      suburb: React.PropTypes.string,
      postcode: React.PropTypes.string,
      photo: React.PropTypes.string,
      ownerId: React.PropTypes.number,
      ownerFN: React.PropTypes.string,
      ownerLN: React.PropTypes.string,
      ownerPhone: React.PropTypes.string,
      ownerEmail: React.PropTypes.string,
      agentFN: React.PropTypes.string,
      agentLN: React.PropTypes.string,
      agentPhone: React.PropTypes.string,
      agentEmail: React.PropTypes.string,
      tenantFN: React.PropTypes.string,
      tenantLN: React.PropTypes.string,
      tenantPhone: React.PropTypes.string,
      tenantEmail: React.PropTypes.string,
    }),
  },

  getInitialState() {
    return {
      showUpdateForm: false,
    };
  },

  renderDetails(details) {
    if (!details[1].value) return null; // no details

    return details.map((row, idx) => {
      return (
        <div key={idx} style={style.details}>
          <FontIcon style={style.icon} className="material-icons">{row.icon}</FontIcon>
          <div style={style.detail}>
            {row.value}
          </div>
          {row.subscript ? (
            <div style={style.subscript}>{row.subscript}</div>
          ) : null}
        </div>
      );
    });
  },

  onEditDetails() {
    this.setState({ showUpdateForm: true });
  },

  onPropertyDetailsUpdated() {
    this.setState({ showUpdateForm: false });
    this.props.onPropertyDetailsUpdated();
  },

  onClose() {
    this.setState({ showUpdateForm: false });
  },

  render() {
    var { details } = this.props;

    var ownerDetailRows = [
      { icon: 'person', value: `${details.ownerFN} ${details.ownerLN}` },
      { icon: 'phone', value: details.ownerPhone },
      { icon: 'email', value: details.ownerEmail },
    ];
    var ownerDetails = this.renderDetails(ownerDetailRows);

    var agentDetailRows = [
      { icon: 'person', value: `${details.agentFN} ${details.agentLN}` },
      { icon: 'phone', value: details.agentPhone },
      { icon: 'email', value: details.agentEmail },
    ];
    var agentDetails = this.renderDetails(agentDetailRows);

    var tenantDetailRows = [
      { icon: 'person', value: `${details.tenantFN} ${details.tenantLN}` },
      { icon: 'phone', value: details.tenantPhone },
      { icon: 'email', value: details.tenantEmail },
      { icon: 'bookmark', value: moment(details.leaseExpiry).format('DD–MM–YYYY'), subscript: 'Lease expiry' },
    ];
    var tenantDetails = this.renderDetails(tenantDetailRows) || <div>No current tenant</div>;

    var { photo, street, suburb } = details;
    var { userType } = this.props;

    var photoBg = photo ? {
      backgroundImage: `url(${photo})`,
      backgroundSize: 'cover',
    } : null;

    return (
      <div style={style.page}>
        <PageHeading>Property Details</PageHeading>
        <div key="propertyDetails" style={style.pocket}>
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
                { agentDetails }
              </div>
            </div>
          </div>

          { userType !== 'owner' ? (
            <div style={[style.section, style.noPadding]}>
              <div style={style.keyValuePair}>
                <div style={style.key}>Current Tenant</div>
                <div style={style.value}>
                  { tenantDetails }
                </div>
              </div>
            </div>
          ) : null }

          { userType !== 'tenant' ? (
            <div style={[style.section, style.noPadding]}>
              <div style={style.keyValuePair}>
                <div style={style.key}>Owner</div>
                <div style={style.value}>
                  { ownerDetails }
                </div>
              </div>
            </div>
          ) : null }

          { userType === 'agent' && details ? (
            <div style={[style.section, style.noPadding]}>
              <div style={style.keyValuePair}>
                <div style={style.updateButtonContainer}>
                  <RaisedButton label="Edit Details"
                                primary={true}
                                onClick={this.onEditDetails} />
                  <UpdatePropertyForm
                    isOpen={this.state.showUpdateForm}
                    onClose={this.onClose}
                    details={details}
                    onPropertyDetailsUpdated={this.onPropertyDetailsUpdated} />
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
    position: 'relative',
  },
  detail: {
    paddingLeft: '1em',
  },
  subscript: {
    position: 'absolute',
    left: 38,
    bottom: -12,
    fontSize: 13,
    color: '#999',
  },
  icon: {
    color: '#555',
  },
  updateButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }
};

module.exports = MuiContextified(Radium(PropertyDetails));
