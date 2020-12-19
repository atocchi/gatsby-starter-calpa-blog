/* eslint react/prop-types: 0 */
import React from 'react';
import Fragment from 'react';
import Link from 'gatsby-link';

/* eslint-disable react/destructuring-assignment */
/* eslint react/prop-types: 0 */







const API= ({ data }) => {
    const fake = '{fake}'
    const { allMarkdownRemark } = data;
    const edge = allMarkdownRemark.edges
    const len = edge.length - 1
  //create a fake JSON Object for scapers to use
    return (
      <div className="data">
      <p>{fake}</p>
       {'['}
      {edge.map((item, key) => ( 
      <Fragment>
        {"{"}
        "slug": "{item.node.fields.slug}",
        "title": "{item.node.frontmatter.title}",
        "description": "{item.node.frontmatter.description}",
        "image": "{item.node.frontmatter.headerImage}"
        {"}"}{key == len ? "" : ","}
      </Fragment>
      ))}
      {"]"}
       
      
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
  