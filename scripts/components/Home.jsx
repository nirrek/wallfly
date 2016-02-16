var React = require('react');
var ReactRouter = require('react-router');
var Navigation = ReactRouter.Navigation;
var Radium = require('radium');
var MaterialUi = require('material-ui');
var RaisedButton = MaterialUi.RaisedButton;
var MuiContextified = require('./MuiContextified.jsx');

/**
 * Home Component.
 * Homepage view component.
 */
var Home = React.createClass({
  mixins: [ Navigation ],

  /**
   * Transitions to the destination route.
   * Function is intended to be a bound click event handler on links.
   * @param  {String} destination The destination route
   * @param  {Object} event       The click event object.
   */
  transition(destination, event) {
    event.preventDefault();
    this.transitionTo(destination);
  },

  render() {
    return (
      <div>
        <div style={styles.marqueeBg}>
          <div style={styles.marquee}>
            <div style={styles.header}>
              <div style={styles.headerInner}>
                <img
                  style={styles.logo}
                  height="45"
                  src={require('../../assets/logotype.svg')} />
                <div style={styles.separator}></div>
                <div>
                  <a href="#" style={styles.navBtn} onClick={this.transition.bind(this, 'login')}>
                    Login
                  </a>
                  <a href="#" style={[styles.navBtn, styles.navBtnAccent]} onClick={this.transition.bind(this, 'createAccount')}>
                    Get started for FREE
                  </a>
                </div>
              </div>
            </div>
            <div style={styles.marqueeContent}>
              <div style={styles.slogan}>
                <h1 style={styles.sloganHeading}>Rental Management Made Easy</h1>
                <div style={styles.alignCenter}>
                  <h2 style={styles.sloganSubheading}>If you are ready to begin taking the pain out of property management,</h2>
                  <br style={styles.br} />
                  <h2 style={styles.sloganSubheading}> sign up for a free account today.</h2>
                </div>
              </div>
              <a ref="button" style={styles.button} onClick={this.transition.bind(this, 'createAccount')}>
                Get started for <i>FREE</i>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div style={styles.appDisplay}>
            <div style={styles.alignCenter}>
              <h2 style={styles.appDisplayTitle}>Wallfly brings all of your rental management needs</h2>
              <br style={styles.br} />
              <h2 style={styles.appDisplayTitle}> into a simple, unified app.</h2>
            </div>

            <div style={styles.macContainer}>
              <img
                style={styles.mac}
                src={require('../../assets/mac.png')} />
            </div>
          </div>
        </div>
        <div style={[styles.slat, styles.slatAccent]}>
          <div style={[styles.imgContainer, styles.imgContainerAccent]}>
            <div style={[styles.img, styles.imgAccent]}>
              <img
                style={[styles.img, styles.imgAccent]}
                src={require('../../assets/agent.png')} />
            </div>
          </div>
          <div style={styles.featuresContainer}>
            <div style={styles.features}>
              <h2>Agents</h2>

              <p><b>Property management</b> showing a list of properties they are in charge of and access to the payment logs for each of these.</p>

              <p><b>Seamless interaction</b> with the all parties to be a mediator and point of contact. Access to calendar showing important events for each property.</p>

              <p>Making the <b>rental process simpler</b> including access to information about lodging disputes with RTA and a form to do this. They have access to important documentation regarding the current tenancy for each property.</p>
            </div>
          </div>
        </div>
        <div style={[styles.slat]}>
          <div style={[styles.imgContainer, styles.imgContainerAccent]}>
            <div style={styles.img}>
              <img
                style={styles.img}
                src={require('../../assets/owner.png')} />
            </div>
          </div>
          <div style={[styles.featuresContainer, styles.featuresAlternate]}>
            <div style={styles.features}>
              <h2>Owners</h2>

              <p><b>Property management</b> showing list of all properties they own, payment logs for each of these properties and relevant details. The ability to create and access repair requests and accept/reject these requests.</p>

              <p><b>Seamless interaction</b> with the Agent through the messaging service. A calendar showing important events for the property.</p>

              <p>Making the <b>rental process simpler</b> including access to information about lodging disputes with RTA and a form to do this. They have access to important documentation regarding the current tenancy for each property.</p>
            </div>
          </div>
        </div>

        <div style={[styles.slat, styles.slatAccent]}>
          <div style={[styles.imgContainer, styles.imgContainerAccent]}>
            <div style={[styles.img, styles.imgAccent]}>
              <img
                style={[styles.img, styles.imgAccent]}
                src={require('../../assets/tenant.png')} />
            </div>
          </div>
          <div style={[styles.featuresContainer]}>
            <div style={styles.features}>
              <h2>Tenant</h2>

              <p><b>Manage all the payments</b> they are making, get a clear indication of the amounts that need to be paid and when they need to be paid by. Including the ability to make payments and a payment history log.</p>

              <p><b>Seamless interaction</b> with the Agent including making repair requests, messaging service and calendar detailing relevant dates.</p>

              <p>Making the <b>rental process simpler</b> including access to information about lodging disputes with RTA and a form to do this. They have access to important documentation regarding the current tenancy. They also have access to relevant property details.</p>
            </div>
          </div>
        </div>

        <div style={styles.cta}>
          <h2 style={styles.ctaHeading}>Get started today.</h2>
          <div style={styles.alignCenter}>
            <span>If you are ready to begin taking the pain out of property management,</span>
            <br style={styles.br} />
            <span> sign up for a free account today.</span>
          </div>
          <br />
          <RaisedButton style={styles.ctaBtn} primary={true} label="Sign up for FREE" onClick={this.transition.bind(this, 'createAccount')} />
        </div>

        <div style={styles.footer}>
          <img
            style={styles.footerLogo}
            src={require('../../assets/logo.svg')} />
        </div>
      </div>
    );
  }
});

var marqueeBg = require('../../assets/marquee.png');

var styles = {
  marqueeBg: {
    backgroundImage: `url(${marqueeBg})`,
    height: 600,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  marquee: {
    backgroundColor: 'rgba(46, 204, 113, 0.88)',
    width: '100%',
    height: '100%',
    color: '#fff',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    userSelect: 'none',
  },
  marqueeContent: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    height: 80,
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(12, 68, 36, 0.06)',
  },
  headerInner: {
    width: '60vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      width: '100%',
      margin: '0 2em',
    },
  },
  logo: {
    marginTop: -1,
  },
  separator: {
    flexGrow: 1,
  },
  navBtn: {
    color: '#fff',
    marginLeft: '1em',
    padding: '10px 16px',
    fontWeight: 500,
    fontSize: 15,
  },
  navBtnAccent: {
    border: '2px solid',
    borderRadius: 2,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  slogan: {
    fontWeight: 500,
    textAlign: 'center',
  },
  sloganHeading: {
    textShadow: '0 1px 2px rgba(0,0,0, 0.2)',
  },
  sloganSubheading: {
    fontSize: 18,
    fontWeight: 400,
    margin: '-1em 0 1.5em',
    textShadow: '0 1px 1px rgba(0,0,0, 0.1)',
    display: 'inline',
  },
  button: {
    background: '#fff',
    border: 'none',
    fontSize: '17px',
    padding: '.5em 1em',
    borderRadius: '4px',
    color: '#1F6B3F',
    boxShadow: '0 1px 3px rgba(0,0,0, .2)',
    textShadow: 'none',
    transition: 'all 150ms linear',
    marginTop: '1.5em',

    ':hover': {
      cursor: 'pointer',
      boxShadow: '0 1px 6px rgba(0,0,0, .4)',
    },
  },
  appDisplay: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    padding: '12em 1em',
    '@media (max-width: 768px)': {
      padding: '6em 1em',
    },
  },
  appDisplayTitle: {
    fontWeight: 400,
    textAlign: 'center',
    color: '#333',
    lineHeight: 1.3,
    marginBottom: '2em',
    marginTop: 0,
    display: 'inline',
  },
  macContainer: {
    marginTop: '2em',
    maxWidth: 800,
  },
  mac: {
    width: '100%',
  },
  img: {
    lineHeight: 0,
    '@media (max-width: 1440px)': {
      width: 600
    },
    '@media (max-width: 1250px)': {
      width: '100%',
      borderRadius: '4px 0 0 4px',
    }
  },
  imgContainer: {
    '@media (max-width: 1250px)': {
      display: 'flex',
      alignItems: 'center',
    }
  },
  imgContainerAccent: {
    '@media (max-width: 768px)': {
      order: 1,
    },
  },
  imgAccent: {
    '@media (max-width: 1250px)': {
      borderRadius: '0 4px 4px 0',
    },
  },
  slat: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: '#555',
    fontSize: 18,
    '@media (max-width: 1440px)': {
      fontSize: 16,
    },
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  slatAccent: {
    backgroundColor: '#2ECC71',
    color: '#fff',
    justifyContent: 'flex-start',
  },
  featuresContainer: {
    maxWidth: '50em',
    boxSizing: 'border-box',
  },
  featuresAlternate: {
    order: -1,
  },
  features: {
    padding: '6em 6em 0 6em',
    '@media (max-width: 1440px)': {
      padding: '4em'
    },
    '@media (max-width: 768px)': {
      padding: '2em'
    }
  },
  cta: {
    display: 'flex',
    padding: '10em 0',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#555',
  },
  ctaHeading: {
    fontWeight: 500,
    marginBottom: 0,
    color: '#333',
  },
  ctaButton: {
    marginTop: '5em',
    backgroundColor: 'red',
  },
  footer: {
    height: 400,
    backgroundColor: '#2ECC71',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLogo: {
    width: 80,
    opacity: .7,
  },
  br: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  alignCenter: {
    textAlign: 'center',
  },
};

module.exports = MuiContextified(Radium(Home));
