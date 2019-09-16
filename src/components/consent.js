import { Link } from 'gatsby';
import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getConsentCookie, setConsentCookie } from '../util/cookie';
import Helmet from 'react-helmet';

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
    }
  },
  button: {
    margin: theme.spacing(1),
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: theme.spacing(1),
      textAlign: 'center'
    },
  }
}));

const COOKIE_NAME = 'cookie-consent';

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Consent = () => {
  const classes = useStyles();
  const [cookieConsentState, setCookieConsentState] = React.useState(
    getConsentCookie(COOKIE_NAME)
  );
  const allowAllCookiesAction = () => {
    setCookieConsentState(
      setConsentCookie(COOKIE_NAME, {
        accepted: true,
        analyticsCookies: true,
        marketingCookies: true,
      })
    );
  };
  console.log('state', cookieConsentState);
  return (
    <>
      {cookieConsentState.accepted && cookieConsentState.analyticsCookies && (
        <Helmet>
          {/* Global site tag (gtag.js) - Google Analytics  */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-148097783-1"
          ></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-148097783-1', { 'allow_ad_personalization_signals': ${cookieConsentState.marketingCookies} });
            `}
          </script>
        </Helmet>
      )}
      {!cookieConsentState.accepted && (
        <AppBar
          position="fixed"
          color="secondary"
          className={classes.bottomBar}
        >
          <Toolbar className={classes.toolbar}>
            <Typography>
              This website uses cookies to ensure you get the best experience on
              our website.
            </Typography>
            <Box className={classes.grow} />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={allowAllCookiesAction}
            >
              Allow
            </Button>
            <Button variant="contained" className={classes.button}>
              Settings
            </Button>
            <Button
              className={classes.button}
              component={AdapterLink}
              to={'/cookies'}
            >
              Learn More
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

Consent.propTypes = {};

Consent.defaultProps = {};

export default Consent;
