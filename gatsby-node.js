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
            title
            author
            image
            post
            slug
          }
        }
      }
      allEditions {
        edges {
          node {
            title
            author
            image
            post
            slug
          }
        }
      }
      allPublications {
        edges {
          node {
            image
            name
            slug
            description
          }
        }
      }
    }
  `)

  res.data.allNews.edges.forEach((edge) => {
    createPage({
      component: postTemplate,
      path: edge.node.slug,
      context: {
        type: "news",
        title: edge.node.title,
        author: edge.node.author,
        image: edge.node.image ? JSON.parse(edge.node.image) : [],
        post: edge.node.post,
        slug: edge.node.slug,
      },
    })
  })
  res.data.allEditions.edges.forEach((edge) => {
    createPage({
      component: postTemplate,
      path: edge.node.slug,
      context: {
        type: "edition",
        title: edge.node.title,
        author: edge.node.author,
        image: edge.node.image ? JSON.parse(edge.node.image) : [],
        post: edge.node.post,
        slug: edge.node.slug,
      },
    })
  })
  res.data.allPublications.edges.forEach((edge) => {
    createPage({
      component: postTemplate,
      path: edge.node.slug,
      context: {
        type: "publication",
        name: edge.node.name,
        slug: edge.node.slug,
        description: edge.node.description,
        image: edge.node.image ? JSON.parse(edge.node.image) : [],
      },
    })
  })
}
