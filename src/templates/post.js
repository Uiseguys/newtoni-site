import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"

import "../scss/pages/posts-page.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PostPage = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    query {
      allSlugs: allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            html
            frontmatter {
              title
              date
              author
            }
          }
        }
      }
      newsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "news-images" } }
      ) {
        nodes {
          publicURL
        }
      }
      editionsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "editions-images" } }
      ) {
        nodes {
          publicURL
        }
      }
      publicationsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "publications-images" } }
      ) {
        nodes {
          publicURL
        }
      }
    }
  `)

  const filterAllSlugs = () => {
    return data.allSlugs.edges.filter(item => {
      if (pageContext.slug == item.node.fields.slug) {
        return item
      }
    })
  }

  const pageDetails = filterAllSlugs()

  const randomCryptoKey = len => {
    let keyArr = []
    for (let i = 0; i < len; i++) {
      keyArr[i] = crypto.randomBytes(6).toString("hex")
    }
    return keyArr
  }

  const renderImages = () => {
    if (/news/i.test(pageContext.slug)) {
      const keyArr = randomCryptoKey(data.newsImageNodes.nodes.length)
      return data.newsImageNodes.nodes.map((item, index) => {
        return (
          <figure className="rellax" key={keyArr[index]}>
            <img src={item.publicURL} />
            <figcaption className="rellax">
              {pageDetails[0].node.frontmatter.title}
            </figcaption>
          </figure>
        )
      })
    }
    if (/editions/i.test(pageContext.slug)) {
      const keyArr = randomCryptoKey(data.newsImageNodes.nodes.length)
      return data.editionsImageNodes.nodes.map((item, index) => {
        return (
          <figure className="rellax" key={keyArr[index]}>
            <img src={item.publicURL} />
            <figcaption className="rellax">
              {pageDetails[0].node.frontmatter.title}
            </figcaption>
          </figure>
        )
      })
    }
    if (/publications/i.test(pageContext.slug)) {
      const keyArr = randomCryptoKey(data.newsImageNodes.nodes.length)
      return data.publicationsImageNodes.nodes.map((item, index) => {
        return (
          <figure className="rellax" key={keyArr[index]}>
            <img src={item.publicURL} />
            <figcaption className="rellax">
              {pageDetails[0].node.frontmatter.title}
            </figcaption>
          </figure>
        )
      })
    }
  }

  return (
    <Layout>
      <aside className="helper">Scroll Sideways</aside>
      <SEO title={pageDetails[0].node.frontmatter.title} />
      <header className="post-page">
        <div>{renderImages()}</div>
      </header>
      <main className="container">
        <div className="row">
          <section className="col-6">
            <div
              style={{ textAlign: "left" }}
              dangerouslySetInnerHTML={{ __html: pageDetails[0].node.html }}
            />
          </section>
          <section className="col-6"></section>
        </div>
      </main>
    </Layout>
  )
}

export default PostPage
