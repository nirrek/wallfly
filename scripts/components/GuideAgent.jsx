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
            <p>Something something.</p>

            <Screenshot src='tenant-no-property.png'
                        caption='Just some examples to show you what to do.' />
            <p>
              Some more stuff.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Another section</h2>
            <p>blah blah</p>
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
