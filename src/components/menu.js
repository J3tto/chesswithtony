import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  growContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    marginTop: theme.mixins.toolbar.minHeight,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  flex: {
    flex: '1',
  },
  footer: {
    marginBottom: theme.spacing(2),
  },
}));

const Menu = ({ open, toggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const data = useStaticQuery(graphql`
    query MainMenuQuery {
      allMarkdownRemark(
        filter: { frontmatter: { menu: { eq: "main" } } }
        sort: { order: ASC, fields: frontmatter___order }
      ) {
        edges {
          node {
            id
            frontmatter {
              menu
              order
              title
              path
              menu_icon
            }
          }
        }
      }
    }
  `);
  console.log(data);
  return (
    <nav aria-label="mailbox folders">
      <Drawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={open}
        onClose={toggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <div className={classes.growContainer}>
          <div className={classes.flexContainer}>
            <Divider />
            <List>
              {data.allMarkdownRemark.edges.map(page => (
                <ListItem
                  button
                  component={Link}
                  to={page.node.frontmatter.path}
                  key={page.node.frontmatter.title}
                  divider
                >
                  <ListItemIcon>
                    <Icon>{page.node.frontmatter.menu_icon || 'help'}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={page.node.frontmatter.title} />
                </ListItem>
              ))}
            </List>
            <div className={classes.flex} />
            <Typography
              variant="caption"
              display="block"
              align="center"
              className={classes.footer}
            >
              © {new Date().getFullYear()}, Built by
              {` `}
              <a href="https://github.com/J3tto">j3tto</a>
            </Typography>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

Menu.propTypes = {
  currentPage: PropTypes.string,
};

Menu.defaultProps = {
  currentPage: ``,
};

export default Menu;
