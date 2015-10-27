var React = require('react');
var Radium = require('radium');
var Screenshot = require('./Screenshot.jsx');

/**
 * GuideAgent is a component for the agent's user guide.
 */
var GuideAgent = React.createClass({
  render() {
    return (
      <div style={styles.page}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.pageTitle}>Agent User Guide</h1>
          <div style={styles.intro}>
            This guide gives a quick walkthrough of getting your account fully setup, and what the various pages in the app allow you to do.
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Getting Started</h2>
            <p>After creating your account, contact your owner and agents to create an account with Wallfly. Ensure that you ask them to inform you when they do so, and to ask for their email address which they used to create the account. This will allow Wallfly to connect the their accounts with yours.</p>

            <h3>Add a property</h3>

            <p>Once you have the email address of your tenant and owners you can add a property. When you login, you'll see your property list.</p>

            <Screenshot src='agent-property-list.png'
                        caption='Add a property by clicking the + button.' />
            <p>
               Click the + button to add your first property. Fill out the all the details including the email addresses of your owner and tenants.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Agent View</h2>
            <p>When you first login, you are presented with the Agent View. These tools will help you with managing all your properties in one place, aggregating the necessary and important details at first glance.</p>
            <h3>Property List</h3>
            <p>The Property List lists all the properties that are connected with your account. You can view the properties details by clicking on a given property.</p>
            <Screenshot src='agent-view.png'
                        caption='Agent View: You tools to manage all your properties - together.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Calendar (Global)</h2>
            <p>This calendar shows a list of all your events that have been added to various properties. By clicking the event you can view further details. You can also edit or delete a given event by clicking the more options icon on the right of every event.</p>
            <Screenshot src='agent-calendar.png'
                        caption='All your events are aggregated into one calendar list.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Repairs (Global)</h2>
            <p>Repair requests from all properties that have been submitted are listed. Every repair request is categorized into priorties which can be used to filter the result. This can be done using the Filter by Priorty dropdown menu. As an agent, you can also  change the status of any given repair request.</p>
            <Screenshot src='agent-repair-requests.png'
                        caption='An aggregated list of repair requests across all properties you manage.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Overdue Rent</h2>
            <p>All overdue rent payments across all properties are listed. You can proceed to communicate with the tenant to rectify the issue.</p>
            <Screenshot src='agent-overduerent.png'
                        caption='Lists all overdue rent in one place.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Property Details</h2>
            <p>The property details pages gives an overview of all the main details of a property, including details of the owner, the current tenant, and when the current lease expires. You can also easily update the details of the properties on this page.</p>
            <Screenshot src='agent-property-details.png'
                        caption='Property details page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Payments</h2>
            <p>The payments page allows you to see all payments associated with a particular property. Typically this will be a mix of rent payments from the tenant, payments you or the owner have made for repairs, and charges you have issued to the owner (including your monthly fees). The Add Payment functionality on this page allows you to add charges to the payment log for you and the owner to see (these are typically payments for repairs, or fees you have chared the owner). Importantly, these extra payments will not be visible by the tenant, they will only see their rent payments. </p>
            <Screenshot src='agent-payments.png'
                        caption='Payments page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Repair Requests</h2>
            <p>The repair requests page allows you to see all requests lodged by tenants of the properties that you manage. You can update the status of each requests to pending, approved or declined. The status will then be updated for the tenants to check. </p>
            <Screenshot src='agent-repair-requests-property.png'
                        caption='Repair requests page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Inspection Reports</h2>
            <p>The inspection reports page allows you to lodge reports of completed inspections. These can then be viewed by the owners and tenants.</p>
            <Screenshot src='tenant-inspection-reports.png'
                        caption='Inspection reports page.' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Calendar</h2>
            <p>The calendar page allows you to easily see any important dates for the property. You can add events and events that will be shown on the calendar include days that repairmen may be coming to fix something, inspections days, and the expiry of the lease. On a particular calendar day you can see a small snippet for any events, to get full information for the event simply click on the event to open up a more detailed view of it.</p>
            <Screenshot src='agent-calendar-property.png'
                        caption='Calendar Page' />
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Messages</h2>
            <p>The messages page give you the ability to chat with your owners and tenants. No need to keep track of emails or text messages between you and your clients/tenant. Using the messages feature ensures there is a record of everything you and your clients/tenants have ever discussed.</p>
            <Screenshot src='agent-messages.png'
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

module.exports = Radium(GuideAgent);
