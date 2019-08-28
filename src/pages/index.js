import React from "react"
import crypto from "crypto"
import axios from "axios"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

// Import Home index styling
import "../scss/pages/index.scss"

const IndexPage = ({ newsletterEmail }) => {
  const data = useStaticQuery(graphql`
    query {
      newsPosts: allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
        filter: { frontmatter: { type: { eq: "news" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
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
        edges {
          node {
            childImageSharp {
              fixed(width: 500) {
                src
              }
            }
          }
        }
      }
      editionsPosts: allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
        filter: { frontmatter: { type: { eq: "edition" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
      editionsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "editions-images" } }
      ) {
        edges {
          node {
            childImageSharp {
              fixed(width: 500) {
                src
              }
            }
          }
        }
      }
      publicationsPosts: allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
        filter: { frontmatter: { type: { eq: "publication" } } }
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
      publicationsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "publications-images" } }
      ) {
        edges {
          node {
            childImageSharp {
              fixed(width: 500) {
                src
              }
            }
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
      scrollLink: file(name: { eq: "scroll" }) {
        publicURL
      }
      indexScroll: file(ext: { eq: ".js" }, name: { eq: "indexScroll" }) {
        publicURL
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

  const renderNewsImages = () => {
    const arr = data.newsImageNodes.edges.map(item => {
      return {
        thisItem: item,
        otherURLS: data.newsImageNodes.edges,
      }
    })
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
          <figure>
            <a href={data.newsPosts.edges[index].node.fields.slug}>
              <img src={item.thisItem.node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[0].node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[1].node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[2].node.childImageSharp.fixed.src} />
            </a>
            <figcaption>
              {data.newsPosts.edges[index].node.frontmatter.title}
            </figcaption>
          </figure>
        </li>
      )
    })
  }

  const renderEditionsImages = () => {
    const arr = data.editionsImageNodes.edges.map(item => {
      return {
        thisItem: item,
        otherURLS: data.editionsImageNodes.edges,
      }
    })
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
          <figure>
            <a href={data.editionsPosts.edges[index].node.fields.slug}>
              <img src={item.thisItem.node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[0].node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[1].node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[2].node.childImageSharp.fixed.src} />
            </a>
            <figcaption>
              {data.editionsPosts.edges[index].node.frontmatter.title}
            </figcaption>
          </figure>
        </li>
      )
    })
  }

  const renderPublicationsImages = () => {
    const arr = data.publicationsImageNodes.edges.map(item => {
      return {
        thisItem: item,
        otherURLS: data.publicationsImageNodes.edges,
      }
    })
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
          <figure>
            <a href={data.publicationsPosts.edges[index].node.fields.slug}>
              <img src={item.thisItem.node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[0].node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[1].node.childImageSharp.fixed.src} />
              <img src={item.otherURLS[2].node.childImageSharp.fixed.src} />
            </a>
            <figcaption>
              {data.publicationsPosts.edges[index].node.frontmatter.title}
            </figcaption>
          </figure>
        </li>
      )
    })
  }

  const onNewsletterChange = value => {
    newsletterEmail = value
    console.log(newsletterEmail)
  }

  const handleNewsletterSubmit = e => {
    e.preventDefault()
    const bodyFormData = {
      email: newsletterEmail,
    }
    axios({
      method: "post",
      url: "https://api.newsletter2go.com/recipients",
      data: bodyFormData,
      config: {
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "Bearer 5jfwxrr7_wlIQLAf_nfpXTFfL_56acwY8m_csbxDWUl:dek9ieif",
        },
      },
    })
      .then(function(response) {
        //handle success
        console.log(response)
      })
      .catch(function(response) {
        //handle error
        console.log(response)
      })
  }

  return (
    <Layout>
      <nav>
        <span id="news">
          &nbsp;N
          <br />
          &nbsp;&nbsp;e
          <br />w<br />
          s&nbsp;
        </span>
        <span id="editions">
          E<br />d<br />i<br />t<br />i<br />o<br />n<br />s
        </span>
        <span id="publications">
          P<br />u<br />b<br />l<br />i<br />c<br />a<br />t<br />i<br />o<br />
          n<br />s
        </span>
      </nav>
      <Header siteTitle={data.site.siteMetadata.title} />
      <SEO title="Home" />
      <main className="container">
        <section>
          <h2>News</h2>
          <ul className="row list-unstyled">{renderNewsImages()}</ul>
          <a href="/news">&gt; More News</a>
        </section>
        <section>
          <h2>Editions</h2>
          <ul className="row list-unstyled">{renderEditionsImages()}</ul>
          <a href="/editions">&gt; More Editions</a>
        </section>
        <section>
          <h2>Publications</h2>
          <ul className="row list-unstyled">{renderPublicationsImages()}</ul>
          <a href="/publications">&gt; More Publications</a>
        </section>
        <section>
          <h2>Contact</h2>
          <aside>
            <p>
              New Toni Press <br />
              Immanuelkirchstrasse 15
              <br />
              10407 Berlin
              <br />
              mail@newtoni.press
            </p>
          </aside>
        </section>
        <section>
          <h2>Newsletter</h2>
          <form onSubmit={e => handleNewsletterSubmit(e)}>
            <label htmlFor="">Subscribe here for our newsletter</label>
            <div className="form-group">
              <input
                type="text"
                className="form-check-input"
                id="exampleCheck1"
                onChange={e => onNewsletterChange(e.target.value)}
              />
              <button type="submit" className="btn">
                Subscribe
              </button>
            </div>
          </form>
        </section>
        <section>
          <h2>Imprint</h2>
          <aside>
            <p>responsible for this website are Thomas Hesse and Felix Toth</p>
            <p>
              New Toni Press <br />
              Immanuelkirchstrasse 15
              <br />
              10407 Berlin
              <br />
              contact@newtoni.press
            </p>
          </aside>
        </section>
      </main>
      <script src={data.indexScroll.publicURL}></script>
    </Layout>
  )
}

IndexPage.defaultProps = {
  newsletterEmail: "",
}

IndexPage.propTypes = {
  newsletterEmail: PropTypes.string,
}

export default IndexPage
