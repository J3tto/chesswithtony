import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Button,
  Icon,
  Snackbar,
  Switch,
  Typography,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getConsentCookie, setConsentCookie } from '../util/cookie';
import Helmet from 'react-helmet';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  bottomBar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2),
  },
  horizontalFlex: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
    },
  },
  verticalFlex: {
    display: 'block',
  },
  grow: {
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

const COOKIE_NAME = 'cookie-consent';

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Consent = ({ frontmatter }) => {
  const classes = useStyles();
  const [cookieConsentState, setCookieConsentState] = React.useState(
    getConsentCookie(COOKIE_NAME)
  );
  const [
    cookieConsentSettingsOpen,
    setCookieConsentSettingsOpen,
  ] = React.useState(false);
  const [
    cookieConsentSaveStateOpen,
    setCookieConsentSaveStateOpen,
  ] = React.useState(false);
  const [
    cookieConsentAnalyticsState,
    setCookieConsentAnalyticsState,
  ] = React.useState(cookieConsentState.analyticsCookies);
  const allowCookiesAction = (
    analyticsCookies = true,
    marketingCookies = false
  ) => {
    setCookieConsentState(
      setConsentCookie(COOKIE_NAME, {
        accepted: true,
        analyticsCookies,
        marketingCookies,
      })
    );
    setCookieConsentSaveStateOpen(true);
  };
  console.log(frontmatter.path);
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

      {!cookieConsentState.accepted && !cookieConsentSettingsOpen && (
        <Box className={[classes.bottomBar, classes.horizontalFlex]}>
          <Typography variant="subtitle1">
            This website uses cookies to ensure you get the best experience on
            our website.
          </Typography>
          <Box className={classes.grow} />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={allowCookiesAction}
          >
            Allow
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setCookieConsentSettingsOpen(true)}
          >
            Settings
          </Button>
          <Button
            className={classes.button}
            component={AdapterLink}
            to={'/cookies'}
          >
            Learn More
          </Button>
        </Box>
      )}
      {((!cookieConsentState.accepted && cookieConsentSettingsOpen) ||
        frontmatter.path === '/cookies') && (
        <Box className={[classes.bottomBar, classes.verticalFlex]}>
          <Typography variant="subtitle1" gutterBottom>
            Necessary Session Cookies
          </Typography>
          <Typography component="p" variant="caption" gutterBottom>
            Some cookies are required to provide core functionality. The website
            cannot function properly without them and therefore are enabled by
            default.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Analytical Cookies{' '}
            <Switch
              color="primary"
              checked={cookieConsentAnalyticsState}
              onChange={event =>
                setCookieConsentAnalyticsState(event.target.checked)
              }
              value="analyticalCookies"
              inputProps={{ 'aria-label': 'Analytical Cookies Toggle' }}
            />
          </Typography>
          <Typography component="p" variant="caption" gutterBottom>
            We use analytical cookies help us improve our website by collecting
            and reporting information about its usage to support future
            improvements.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Marketing Cookies
          </Typography>
          <Typography component="p" variant="caption" paragraph>
            We do not use marketing cookies to track visitors across websites in
            order to allow the display of relevant ads.
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => allowCookiesAction(cookieConsentAnalyticsState)}
            >
              Save Settings
            </Button>
            {frontmatter.path !== '/cookies' && (
              <Button
                className={classes.button}
                component={AdapterLink}
                to={'/cookies'}
              >
                Learn More
              </Button>
            )}
          </Box>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={cookieConsentSaveStateOpen}
        autoHideDuration={6000}
        onClose={() => setCookieConsentSaveStateOpen(false)}
        message={'Cookie settings saved'}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={() => setCookieConsentSaveStateOpen(false)}
          >
            <Icon>close</Icon>
          </IconButton>,
        ]}
      />
    </>
  );
};

Consent.propTypes = {
  frontmatter: PropTypes.object.isRequired,
};

Consent.defaultProps = {};

export default Consent;
