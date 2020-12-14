import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import Sidebar from '../components/Sidebar';
import Tag from '../components/Tag';
import SEO from '../components/SEO';

// eslint-disable-next-line react/prop-types
const API= ({ data }) => {
  const { allMarkdownRemark } = data;
  const edge = allMarkdownRemark.edges

  return (
    <div className="data">
    
     
    {edge.map(item => ( 
    <Fragment>
      {"{"}
      slug: {item.node.fields.slug},
      title: {item.node.frontmatter.title},
      description: {item.node.frontmatter.description},
      image: {item.node.frontmatter.headerImage}
      {"}"},
    </Fragment>
    ))}
     
    
    </div>
  );
};

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
  }`
