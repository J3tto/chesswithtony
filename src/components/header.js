import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  appBar: {
    // marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1000,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = ({ menuToggle }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={menuToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6">Chess With Tony</Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
