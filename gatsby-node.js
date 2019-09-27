/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  // 1. Get Path to template
  // 2. Get markdown data
  // 3. Create new pages
  const { createPage } = actions
  const postTemplate = path.resolve("src/templates/post.js")
  // Get all posts from each section and create a page for each
  const res = await graphql(`
    query {
      allNews {
        edges {
          node {
            slug
          }
        }
      }
      allEditions {
        edges {
          node {
            slug
          }
        }
      }
      allPublications {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  res.data.allNews.edges.forEach(edge => {
    createPage({
      component: postTemplate,
      path: edge.node.slug,
      context: {
        slug: edge.node.slug,
      },
    })
  })
  res.data.allEditions.edges.forEach(edge => {
    createPage({
      component: postTemplate,
      path: edge.node.slug,
      context: {
        slug: edge.node.slug,
      },
    })
  })
  res.data.allPublications.edges.forEach(edge => {
    createPage({
      component: postTemplate,
      path: edge.node.slug,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
