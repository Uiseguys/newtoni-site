import React from "react"
// import { Link } from "gatsby"
import crypto from "crypto"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

// Import Home index styling
import "../scss/pages/index.scss"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      newsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "news-images" } }
      ) {
        nodes {
          name
          publicURL
        }
      }
      editionsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "editions-images" } }
      ) {
        nodes {
          name
          publicURL
        }
      }
      publicationsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "publications-images" } }
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

  const renderNewsImages = () => {
    const arr = data.newsImageNodes.nodes
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-md-4" key={keyArr[index]}>
          <img src={item.publicURL} />
        </li>
      )
    })
  }

  const renderEditionsImages = () => {
    const arr = data.editionsImageNodes.nodes
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-md-4" key={keyArr[index]}>
          <img src={item.publicURL} />
        </li>
      )
    })
  }

  const renderPublicationsImages = () => {
    const arr = data.publicationsImageNodes.nodes
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-md-4" key={keyArr[index]}>
          <img src={item.publicURL} />
        </li>
      )
    })
  }

  return (
    <Layout>
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
          <form method="post">
            <label htmlFor="exampleFormControlSelect1">
              Subscribe here for our newsletter
            </label>
            <div className="form-group">
              <input
                type="text"
                className="form-check-input"
                id="exampleCheck1"
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
    </Layout>
  )
}

export default IndexPage
