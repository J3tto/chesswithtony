import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box, Icon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({}));

const OtherMenu = ({ open, toggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const globalMenuData = useStaticQuery(graphql`
    query GlobalMenuQuery {
      allMarkdownRemark(
        filter: { frontmatter: { menu: { eq: "global" } } }
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

  return (
    <>
      <Box>
        <List dense>
          {globalMenuData.allMarkdownRemark.edges.map(page => (
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
      </Box>
    </>
  );
};

OtherMenu.propTypes = {};

OtherMenu.defaultProps = {};

export default OtherMenu;
