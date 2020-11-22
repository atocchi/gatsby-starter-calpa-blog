import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { config } from '../../../data';

import Information from './Information';

import './index.scss';

const {
  wordings = [],
  githubUsername,
  zhihuUsername,
  iconUrl,
  about,
  facebook,
} = config;

const Icon = ({ href, icon }) => (
  <a
    target="_blank"
    href={href}
    rel="external nofollow noopener noreferrer"
    className="custom-icon"
  >
    <span className="fa-layers fa-fw fa-2x">
      <FontAwesomeIcon icon={icon} />
    </span>
  </a>
);

const Sidebar = ({ totalCount, latestPosts, name, image, desc, email, linkedin }) => (
  <header className="intro-header site-heading text-center col-xl-2 col-lg-3 col-xs-12 order-lg-1">
    <div className="about-me">
      {/* <Link to={about} href={about} className="name"> */}
        <img className="avatar" src={image} alt={name} />
        <h4>{name}</h4>
      {/* </Link> */}
      {/* <p className="mb-1">{wordings[0]}</p>
      <p className="mb-3">{wordings[1]}</p>
      <Icon
        href={`https://www.zhihu.com/people/${zhihuUsername}`}
        icon={['fab', 'zhihu']}
      /> */}
      {/* <Icon
        href={`https://github.com/${githubUsername}`}
        icon={['fab', 'github']}
      /> */}
      <Icon href={`mailto:${email}`} icon={['far', 'envelope']} />
      {linkedin
         && <Icon href={linkedin} icon={['fab', 'linkedin']} />
      }
      {/* {facebook
        && <Icon href={`https://www.facebook.com/${facebook}/`} icon={['fab', 'facebook']} />
      } */}
      {/* <Information totalCount={totalCount} posts={latestPosts} /> */}
      <div>
        {desc}
      </div>
    </div>
  </header>
);

Icon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Sidebar.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  linkedin: PropTypes.string,
  desc: PropTypes.string,
  totalCount: PropTypes.number,
  latestPosts: PropTypes.array, //eslint-disable-line
};

Sidebar.defaultProps = {
  name: 'Anon',
  email: '',
  linkedin: '',
  image: '',
  desc: '',
  totalCount: 0,
  latestPosts: [],
};

export default Sidebar;
//   <StaticQuery
//     query={graphql`
//       fragment cardData on MarkdownRemark {
//         fields {
//           slug
//         }
//         frontmatter {
//           id
//           title
//           url: slug
//           date
//           tags
//           description
//           headerImage
//         }
//       }

//       query SidebarQuery {
//         all: allMarkdownRemark {
//           totalCount
//         }

//         limited: allMarkdownRemark(
//           sort: { order: DESC, fields: frontmatter___date }
//           limit: 6
//         ) {
//           latestPosts: edges {
//             node {
//               ...cardData
//             }
//           }
//         }
//       }
//     `}
//     render={data => <Sidebar {...data.all} {...data.limited} />}
//   />
// );
