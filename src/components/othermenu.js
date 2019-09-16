import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

const OtherMenu = ({ open, toggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const otherMenuData = useStaticQuery(graphql`
    query OtherMenuQuery {
      allMarkdownRemark(
        filter: { frontmatter: { menu: { eq: "other" } } }
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
        {otherMenuData.allMarkdownRemark.edges.map(page => (
          <Typography variant="caption" display="block" align="center">
            <Link to={page.node.frontmatter.path}>
              {page.node.frontmatter.title}
            </Link>
          </Typography>
        ))}
        <Typography
          variant="caption"
          display="block"
          align="center"
        >
          Cookie Settings
        </Typography>
      </Box>
    </>
  );
};

OtherMenu.propTypes = {};

OtherMenu.defaultProps = {};

export default OtherMenu;
