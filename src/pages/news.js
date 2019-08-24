import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"
import Header from "../components/header"
import "../scss/pages/posts-home.scss"
// import { postsHomeScroll } from "../js/scroll"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NewsPage = () => {
  const data = useStaticQuery(graphql`
    {
      newsPosts: allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
        filter: { frontmatter: { type: { eq: "news" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              date(fromNow: true)
              author
            }
            fields {
              slug
            }
          }
        }
      }
      newsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "news-images" } }
      ) {
        nodes {
          name
          publicURL
        }
      }
    }
  `)

  const randomCryptoKey = arr => {
    let keyArr = []
    for (let i = 0; i < arr.length; i++) {
      keyArr[i] = crypto.randomBytes(6).toString("hex")
    }
    return keyArr
  }

  const renderNewsPosts = () => {
    const arr = data.newsPosts.edges
    // Image Array Nodes
    const imgArr = data.newsImageNodes.nodes
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-6 offset-3" key={keyArr[index]}>
          <figure>
            <div className="img-container">
              <img src={imgArr[index].publicURL} />
            </div>
            <figcaption>
              <a href={item.node.fields.slug}>
                <i>{item.node.frontmatter.title}</i>
              </a>
              <br />
              <small>{item.node.frontmatter.author}</small>
              <br />
              <small>{item.node.frontmatter.date}</small>
              <br />
            </figcaption>
          </figure>
        </li>
      )
    })
  }

  // postsHomeScroll()

  return (
    <Layout>
      <SEO title="News" />
      <nav>
        <span id="news">
          N<br />e<br />w<br />s
        </span>
      </nav>
      <Header />
      <main className="container">
        <div className="row">
          <h1 className="col-4 offset-3">Latest News</h1>
        </div>
        <ul className="row">{renderNewsPosts()}</ul>
      </main>
    </Layout>
  )
}

export default NewsPage
