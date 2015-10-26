var React = require('react');
var Radium = require('radium');
var Screenshot = require('./Screenshot.jsx');

/**
 * GuideTenant is a component for the tenant's user guide.
 */
var GuideTenant = React.createClass({
  render() {
    return (
      <div style={styles.page}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.pageTitle}>Tenant User Guide</h1>
          <div style={styles.intro}>
            This guide gives a quick walkthrough of getting your account fully setup, and what the various pages in the app allow you to do.
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Getting Started</h2>
            <p>After creating your account, you will not yet be assigned to a property. The first thing you need to do is notify your agent that you have created an account with Wallfly. Simply provide them with the email you used to sign up, and they will add you to the property. You will see the notification below on your login screen until you have been added to a property.</p>

            <Screenshot src='tenant-no-property.png'
                        caption='You will have a notification like this until you have been added to a property.' />
            <p>
              Once you have been added to your property, you will instead be presented with the property details on your login page.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Property Details</h2>
            <p>The property details gives an overview of all the important details of your property, including details for your managing agent, your current listed details, and the date that your lease expires.</p>
            <Screenshot src='tenant-property-details.png'
                        caption='Property details page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Payments</h2>
            <p>The payments page allows you to see all rent payments for your property. If a particular rent payment is outstanding a <i>Pay Now</i> button will appear, allowing you to make a rent payment. </p>
            <Screenshot src='tenant-payments.png'
                        caption='Payments page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Repair Requests</h2>
            <p>The repair requests page allows you to lodge repair requests with your agent. You can add a brief description of the damage, provide a photo, and give a priority. A priority of <i>Urgent</i> should be used for things like burst water main, or other severe types of damage that need to be dealt with as soon as possible. If it is not urgent, but really needs fixing use the <i>Can Wait</i> priority. And if you are just notifying the agent of damage to the property, so there is written record of the damage, use the <i>Information</i> priority. Once you have lodged a request, you can monitor when the agent is processing the request, and has approved or denied it. The agents will update the status of the repair request on their end. </p>
            <Screenshot src='tenant-repair-requests.png'
                        caption='Repair requests page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Inspection Reports</h2>
            <p>The inspection reports page will show any past inspection that the agent has made of the property. This way you are able to see what they consider to be issues with the property or the way you are looking after it. This also serves as a record when issues were first raised (even if this happened prior to your tenancy), so an agent cannot pretend that some prexising/known issue is your fault. It is important to note that once an agent has lodged an inspection report, they are not able to remove it from the system (otherwise it would defeat the purpose as a source of truth for the history of the property).</p>
            <Screenshot src='tenant-inspection-reports.png'
                        caption='Inspection reports page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>RTA Form</h2>
            <p>Disputes between tenants, agents, and owners do occur. Often when it happens tenants aren't aware of what recourse they have, or how they should go about resolving the conflict. We though it was important to make it clear to tenants what their rights are, and what actions they can take should this occur. This page provides you with some key information, and directs you to further resources that will help you out in such a situation.</p>
            <Screenshot src='tenant-rta.png'
                        caption='RTA Form Page' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Calendar</h2>
            <p>The calendar page allows you to easily see any important dates for your property. Typical events that will be shown on the calendar include days that repairmen may be coming to fix something, inspections days, and the expiry of your lease. On a particular calendar day you will see a small snippet for any events, to get full information for the event simply click on the event to open up a more detailed view of it.</p>
            <Screenshot src='tenant-calendar.png'
                        caption='Calendar Page' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Messages</h2>
            <p>The messages page give you the ability to chat with your agent. No need to keep track of emails or text messages between you and your agent. Using the messages feature ensures there is a record of everything you and your agent have ever discussed. It's quick and easy, and your agent will be in the Wallfly app all the time, so you will get a swift response.</p>
            <Screenshot src='tenant-message.png'
                        caption='Messages Page' />
          </div>

        </div>
      </div>
    );
  }
});

var styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 20px 180px 20px',
    flex: '1 0 auto',
  },
  contentWrapper: {
    maxWidth: '40em',
  },
  section: {
    borderBottom: '5px solid #dfdfdf',
    padding: '4em 0 2em',
  },
  pageTitle: {
    lineHeight: 1,
    margin: 0,
    paddingTop: '1em',
  },
  intro: {
    fontSize: 20,
    marginTop: '.5em',
    color: '#777'
  },
  heading: {
    margin: 0,
    lineHeight: 1,
  },
};

module.exports = Radium(GuideTenant);
