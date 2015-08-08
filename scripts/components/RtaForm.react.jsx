var React = require('react');

var RequestForm = React.createClass({
  getInitialState() {
    return {
      // Form state
      bondNumber: 0,
      lodger: {
        name: '',
        postalAddress: '',
        postcode: '',
        phone: '',
        mobile: '',
        email: '',
      },
      assistMethod: '',
      interpreterLanguage: '',
      hasLeftProperty: undefined,
      disputeWith: {
        name: '',
        postalAddress: '',
        postcode: '',
        phone: '',
        mobile: '',
        email: '',
      },
      disputeType: '',
      disputeExtra: '',
      notices: [],
    };
  },

  render() {
    return (
      <form>
        <label>Rental Bond Number</label><input type='text' />
        <h3>Who is lodging this dispute request?</h3>
        <label>Full Name / Trading Name</label><input type='text' />
        <br/><br/> etc...
      </form>
    );
  }
});

var RtaForm = React.createClass({
  render() {
    return (
      <div style={style.page}>
        <div style={style.row}>
          <div style={style.col}>
            <h2>Process for Applying to QCAT</h2>
            <ol>
              <li>First you should try and resolve your dispute directly.</li>
              <li>If you cannot reach agreement, you must try to resolve the dispute assisted by the RTA's dispute resolution service (unless your dispute is considered 'urgent' by the legislation). Lodge a Dispute resolution request (Form 16).</li>
              <li>If you go through the RTA's dispute resolution process and the dispute remains unresolved the RTA will send you a notice of unresolved dispute. You can then choose to lodge an application to have your matter heard at QCAT for an order to be made.</li>
              <li>Once you have applied to QCAT and paid the application fee notices will be sent to attend a hearing on a set date. When the case is heard a decision will be made by the adjudicator or magistrate and you must follow the order given.</li>
            </ol>
          </div>
          <div style={style.col}>
            <h2>RTA Forms</h2>
            <ul>
              <li><a href='#'>Preventing Disputes</a></li>
              <li><a href='#'>Preventing Bond Disputes</a></li>
              <li><a href='#'>Resolving Tenancy Issues</a></li>
              <li><a href='#'>Dispute Resolution by RTA</a></li>
              <li><a href='#'>Matters unsuitable for conciliation</a></li>
              <li><a href='#'>Queensland Civil and Administrative Tribunal</a></li>
            </ul>
          </div>
        </div>

        <h2>RTA Dispute Resolution Request Form</h2>
        <RequestForm />
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  col: {
    width: '50%',
  }
};

export default RtaForm;
