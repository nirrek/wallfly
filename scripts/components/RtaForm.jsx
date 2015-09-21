var React = require('react');
var mui = require('material-ui');
var Card = mui.Card;
var CardHeader = mui.Card;
var CardText = mui.CardText;
var CardTitle = mui.CardTitle;
var FlatButton = mui.FlatButton;
var MuiContextified = require('./MuiContextified.jsx');

var RtaForm = React.createClass({
  render() {
    return (
      <div style={style.page}>
        <div style={style.row}>
          <div style={style.col70}>
            <Card style={style.card}>
              <CardTitle title="Applying for dispute resolution"/>
              <CardText>
              The RTA’s free dispute resolution service helps tenants/residents and property owners/managers to resolve disputes quickly without the need for your matter to go to the Queensland Civil and Administrative Tribunal (QCAT).
              To apply for dispute resolution:
              <ol>
                <li>Fill out a <a href="https://www.rta.qld.gov.au/~/media/Forms/Forms%20for%20general%20tenancies/RTA-dispute-resolution-request-form16.ashx">Dispute resolution request (Form 16)</a>.</li>
                <li>Send it to the RTA along with a summary of the situation and relevant supporting documents.
                    <ul>
                    <li>scan and email to: bonds@rta.qld.gov.au (file size limit 5MB)</li>
                    <li>post to: RTA, GPO Box 390, Brisbane Q 4001</li>
                    <li>in person to: Level 23, 179 Turbot St, Brisbane Q 4000. Mon-Fri 8:30am – 5pm</li>
                    <li>fax to: 07 3046 5288</li>
                    </ul>
                </li>
              </ol>
              </CardText>
            </Card>
            <Card style={style.card}>
              <CardTitle title="Applying to QCAT"/>
              <CardText>
              The Queensland Civil and Administrative Tribunal (QCAT) decides a range of tenancy disputes.
              Before you apply to have your matter heard, QCAT requires you to first attempt the following steps:
              <ol>
                <li>First you should try and resolve your dispute directly.</li>
                <li>If you cannot reach agreement, you must try to resolve the dispute assisted by the RTA's dispute resolution service (unless your dispute is considered 'urgent' by the legislation). Lodge a <a href="https://www.rta.qld.gov.au/~/media/Forms/Forms%20for%20general%20tenancies/RTA-dispute-resolution-request-form16.ashx">Dispute resolution request (Form 16)</a>.</li>
                <li>If you go through the RTA's dispute resolution process and the dispute remains unresolved the RTA will send you a notice of unresolved dispute. You can then choose to lodge an application to have your matter heard at QCAT for an order to be made.</li>
                <li>Once you have applied to QCAT and paid the application fee notices will be sent to attend a hearing on a set date. When the case is heard a decision will be made by the adjudicator or magistrate and you must follow the order given.</li>
              </ol>
              </CardText>
            </Card>
          </div>
          <div style={style.col30}>
            <Card style={style.card}>
              <CardTitle title="Resources"/>
                <CardText>
                <ul>
                  <li><a href='https://www.rta.qld.gov.au/Disputes/Dispute-resolution/How-to-prevent-disputes'>Preventing Disputes</a></li>
                  <li><a href='https://www.rta.qld.gov.au/Disputes/Dispute-resolution/How-to-resolve-tenancy-issues'>Resolve tenancy issues</a></li>
                  <li><a href='https://www.rta.qld.gov.au/Resources/Forms/Forms-for-general-tenancies/Dispute-resolution-request-Form-16'>Dispute Resolution by RTA</a></li>
                  <li><a href='http://www.qcat.qld.gov.au/'>Queensland Civil and Administrative Tribunal</a></li>
                </ul>
              </CardText>
            </Card>
          </div>
        </div>
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
  col70: {
    width: '70%',
    padding: '0.313em',
  },
  col30: {
    width: '30%',
    padding: '0.313em',
  },
  card: {
    marginBottom: '1.250em',
  },
};

module.exports = MuiContextified(RtaForm);
