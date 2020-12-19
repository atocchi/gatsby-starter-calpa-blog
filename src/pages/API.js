import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import Sidebar from '../components/Sidebar';
import Tag from '../components/Tag';
import SEO from '../components/SEO';

// eslint-disable-next-line react/prop-types
const API= ({ data }) => {
  const { allMarkdownRemark } = data;
  const edge = allMarkdownRemark.edges
  const len = edge.length - 1
  const fake = `{"slug":"${edge[0].node.fields.slug}"}`
//create a fake JSON Object for scapers to use
  return (
    <div className="data">
    <p>{fake}</p>
   
    {edge.map((item, key) => ( 
    <Fragment>
      {`{"slug": "${item.node.fields.slug}","title": "${item.node.frontmatter.title}","description": "${item.node.frontmatter.description}","image": "${item.node.frontmatter.headerImage}"}${key == len ? '' : ','}`}
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
