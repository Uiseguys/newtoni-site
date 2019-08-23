import React from "react"
import crypto from "crypto"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { indexScroll } from "../js/scroll"

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
      site {
        siteMetadata {
          title
        }
      }
      scrollLink: file(name: { eq: "scroll" }) {
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
    const arr = data.newsImageNodes.nodes.map(item => {
      return {
        thisItem: item,
        otherURLS: data.newsImageNodes.nodes,
      }
    })
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
          <figure>
            <img src={item.thisItem.publicURL} />
            <img src={item.otherURLS[0].publicURL} />
            <img src={item.otherURLS[1].publicURL} />
            <img src={item.otherURLS[2].publicURL} />
            <figcaption>{item.thisItem.name}</figcaption>
          </figure>
        </li>
      )
    })
  }

  const renderEditionsImages = () => {
    const arr = data.editionsImageNodes.nodes.map(item => {
      return {
        thisItem: item,
        otherURLS: data.editionsImageNodes.nodes,
      }
    })
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
          <figure>
            <img src={item.thisItem.publicURL} />
            <img src={item.otherURLS[0].publicURL} />
            <img src={item.otherURLS[1].publicURL} />
            <img src={item.otherURLS[2].publicURL} />
            <figcaption>{item.thisItem.name}</figcaption>
          </figure>
        </li>
      )
    })
  }

  const renderPublicationsImages = () => {
    const arr = data.publicationsImageNodes.nodes.map(item => {
      return {
        thisItem: item,
        otherURLS: data.publicationsImageNodes.nodes,
      }
    })
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
          <figure>
            <img src={item.thisItem.publicURL} />
            <img src={item.otherURLS[0].publicURL} />
            <img src={item.otherURLS[1].publicURL} />
            <img src={item.otherURLS[2].publicURL} />
            <figcaption>{item.thisItem.name}</figcaption>
          </figure>
        </li>
      )
    })
  }

  // Scroll Effects for the Index Page
  indexScroll()

  return (
    <Layout>
      <nav>
        <span id="news">
          N<br />e<br />w<br />s
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
