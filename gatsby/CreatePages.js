const path = require('path');
const createPaginatedPages = require('gatsby-paginate');

module.exports = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              author
              slug
              id
              title
              url: slug
              date
              tags
              description
              headerImage
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { edges = [] } = result.data.allMarkdownRemark;

    const tagSet = new Set();
    const authorSet = new Set();

    createPaginatedPages({
      edges,
      createPage,
      pageTemplate: 'src/templates/index.js',
      context: {
        totalCount: edges.length,
      },
      pathPrefix: 'pages',
      buildPath: (index, pathPrefix) => {
        if (index > 1) {
          return `${pathPrefix}/${index}`;
        }
        return '/';
      },
    });

    // 創建文章頁面
    edges.forEach(({ node }, index) => {
      const { id, frontmatter, fields } = node;
      const {
        slug, tags, templateKey, author,
      } = frontmatter;

      // 讀取標籤
      if (tags) {
        tags.forEach(item => tagSet.add(item));
      }

      if (author) {
        author.forEach(item => authorSet.add(item));
      }

      // 允许自定义地址
      let $path = fields.slug;
      if (slug) {
        $path = slug;
      }

      const component = templateKey || 'blog-post';

      createPage({
        path: $path,
        tags,
        author,
        component: path.resolve(`src/templates/${String(component)}.js`),
        // additional data can be passed via context
        context: {
          id,
          index,
        },
      });
    });

  tagSet.forEach((tag) => {
      createPage({
        path: `/tag/${tag}`,
        component: path.resolve('src/templates/tag.js'),
        context: {
          tag,
        },
      });
    });

    createPage({
      path: `/API`,
      component: path.resolve('src/templates/API.js'),
      context: {
        id,
        index,
      },
    })

    authorSet.forEach((author) => {
      createPage({
        path: `/author/${author}`,
        component: path.resolve('src/templates/author.js'),
        context: {
          author,
        },
      });
    });
  });
};
