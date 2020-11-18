import React from 'react';
import { graphql } from 'gatsby';

import Sidebar from '../components/Sidebar';
import Tag from '../components/Tag';
import SEO from '../components/SEO';

// eslint-disable-next-line react/prop-types
const AuthorPage= ({ data }) => {
  const { allMarkdownRemark } = data;

  const mapping = {};

  allMarkdownRemark.edges.forEach(({ node }) => {
    const { author } = node.frontmatter;
    author.forEach((name) => {
      if (mapping[name]) {
        mapping[name] += 1;
      } else {
        mapping[name] = 1;
      }
    });
  });

  const author = Array.from(Object.keys(mapping)).sort(
    (b, a) => mapping[a] - mapping[b],
  );

  return (
    <div className="container">
      <div
        className="row"
        style={{
          margin: 15,
        }}
      >
        {/* <Sidebar /> */}

        <div className="col order-2">
          {author.map(item => (
            <Tag name={item} key={item} count={mapping[item]} isAuth={'/author/'}/>
          ))}
        </div>
      </div>
      <SEO
        title="Visit My Studio author"
        url="/blog/authors/"
        siteTitleAlt="VMS Blog"
        isPost={false}
        description="author Page"
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </div>
  );
};

export default AuthorPage;

export const pageQuery = graphql`
  query getAllAuthor {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            author
          }
        }
      }
    }
  }
`;
