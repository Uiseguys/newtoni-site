/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // Create slugs for Markdown documents
  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")
    if (node.frontmatter.type == "news") {
      createNodeField({
        node,
        name: "slug",
        value: "news/" + slug,
      })
    }
    if (node.frontmatter.type == "edition") {
      createNodeField({
        node,
        name: "slug",
        value: "edition/" + slug,
      })
    }
    if (node.frontmatter.type == "publication") {
      createNodeField({
        node,
        name: "slug",
        value: "publication/" + slug,
      })
    }
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  // 1. Get Path to template
  // 2. Get markdown data
  // 3. Create new pages
  const { createPage } = actions
  const postTemplate = path.resolve("src/templates/post.js")
  // Get markdown slugs
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  res.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: postTemplate,
      path: edge.node.fields.slug,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })
}
