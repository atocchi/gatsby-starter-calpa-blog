/* eslint react/prop-types: 0 */
import React from 'react';
import Link from 'gatsby-link';

/* eslint-disable react/destructuring-assignment */
/* eslint react/prop-types: 0 */

// Components
import React, { Component } from 'react';
import { graphql } from 'gatsby';





const API = (data, pageContext) => {
  const { edges } = data.allMarkdownRemark;
  const { author } = pageContext;
    return(
        <div> Hello world </div>
    )
}

export default API;

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            headerImage
          }
        }
      }
    }
  }
`
