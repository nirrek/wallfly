var React = require('react');
var Radium = require('radium');
var Screenshot = require('./Screenshot.jsx');

/**
 * GuideOwner is a component for the owner's user guide.
 */
var GuideOwner = React.createClass({
  render() {
    return (
      <div style={styles.page}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.pageTitle}>Owner User Guide</h1>
          <div style={styles.intro}>
            This guide gives a quick walkthrough of getting your account fully setup, and what the various pages in the app allow you to do.
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Getting Started</h2>
            <p>After creating your account, you will not yet be assigned to any properties. The first thing you need to do is notify your agent that you have created an account with Wallfly. Simply provide them with the email you used to sign up, and they will add you to the properties. You will see the notification below on your login screen until you have been added to any properties.</p>

            <Screenshot src='owner-no-property.png'
                        caption='You will have a notification like this until you have been added to a property.' />
            <p>
              Once you have been added to your properties, you will instead be presented with your property list.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Property List</h2>
            <p>The Property provides a list of all properties with a small thumbnail and address, with the list being searchable by the address. When a property is selected you will be sent the property details page for that property.</p>
            <Screenshot src='owner-property-list.png'
                        caption='Property List page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Property Details</h2>
            <p>The property details gives an overview of all the important details of your property, including details for your managing agent, and your current listed details. From this sub page you will also be able to access all the other information for this specific property including payments, repair requests, inspection reports and a calendar.</p>
            <Screenshot src='owner-property-details.png'
                        caption='Property Details page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Payments</h2>
            <p>The payments page allows you to see all rent payments for your property with the due date, the status, a description and the amount due.</p>
            <Screenshot src='owner-payments.png'
                        caption='Payments Page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Repair Requests</h2>
            <p>From this page you can view all the repair requests that are relevant to the property. You can view the date, their current priority, a description of the issues, relevant images and the current status.</p>
            <Screenshot src='owner-repair-requests.png'
                        caption='Repair Requests Page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Inspection Reports</h2>
            <p>The inspection reports page will provide you a table of all the inspection reports for that property. You will be able to view the date of the report, noted in regards to the inspection and any photos taken of the property during the inspection as uploaded by your managing agent.</p>
            <Screenshot src='owner-inspection-reports.png'
                        caption='Inspection Reports Page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Calendar</h2>
            <p>The calendar page allows you to easily see any important dates for the property. Typical events that will be shown on the calendar include inspections days, and the expiry of the tenant's lease. On a particular calendar day you will see a small snippet for any events, to get full information for the event simply click on the event to open up a more detailed view of it.</p>
            <Screenshot src='owner-calendar.png'
                        caption='Calendar Page' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Agent Chat</h2>
            <p>From the agent chat page you can easily message your agent with a live chat system. No longer will you have to search through emails or remember phone conversations with this messaging feature serving as record of all communications.</p>
            <Screenshot src='owner-message.png'
                        caption='Agent Chat Page' />
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

module.exports = Radium(GuideOwner);
