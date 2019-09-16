import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core';

import Header from './header';
import MainMenu from './mainmenu';
import Theme from './theme';
import Consent from './consent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <ThemeProvider theme={Theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Header
            siteTitle={data.site.siteMetadata.title}
            menuToggle={handleDrawerToggle}
          />
          <MainMenu open={mobileOpen} toggle={handleDrawerToggle} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
            <footer>
              © {new Date().getFullYear()}, Built by
              {` `}
              <a href="https://github.com/J3tto">j3tto</a>
            </footer>
          </main>
          <Consent />
        </div>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
