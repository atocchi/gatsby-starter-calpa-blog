import React from 'react';
import { graphql } from 'gatsby';
import Card from '../components/Card';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar';
import { config } from '../../data';

const {profile = [] } = config;

// eslint-disable-next-line react/prop-types
const AuthorPage = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark;
  const { author } = pageContext;
  console.log(profile[author].picture)
  return (
    <div className="container">
      <div
        className="row"
        style={{
          margin: 15,
        }}
      >
        <Sidebar name={author} image={profile[author].picture} desc={profile[author].description}/>
        {/* <div style={{ width: '20%' }} /> */}
        <div className="col-xl-10 col-lg-7 col-md-12 col-xs-12 order-2">
          <div
            className="col-12"
            style={{
              fontSize: 20,
              margin: 15,
            }}
          > 
            {edges.length}
            &nbsp;Article{edges.length > 1 ? 's' : ''} by&nbsp;
            {author}
          </div>
          {edges.map(({ node }) => (
            <Card {...node.frontmatter} key={node.id} />
          ))}
        </div>

        <div className="col-xl-2 col-lg-1 order-3" />
      </div>

      <SEO
        title={author}
        url={`/author/${author}`}
        siteTitleAlt="Visit My Studio Author"
        isPost={false}
        description={author}
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </div>
  );
};

export default AuthorPage;

export const pageQuery = graphql`
  query AuthorQuery($author: [String!]) {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { author: { in: $author } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            id
            url: slug
            title
            date
            tags
            author
            headerImage
            description
          }
        }
      }
    }
  }
`;
