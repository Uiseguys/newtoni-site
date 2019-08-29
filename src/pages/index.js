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

const IndexPage = ({
  newsletterEmail,
  newsletterPhone,
  newsletterGender,
  newsletterFirstname,
  newsletterLastname,
  accessTokenProp,
}) => {
  // GraphQL queries for the latest images and posts
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
  }

  // Get the Access Token from the Newsletter 2go Website
  const getAccessToken = () => {
    const accessTokenBody = {
      username: "mailadmin@new-toni.press",
      password: "Newsletter2go2312",
      grant_type: "https://nl2go.com/jwt",
    }

    // Making Access Token Request from Newsletter2go
    axios({
      method: "post",
      url: "https://api.newsletter2go.com/oauth/v2/token",
      data: accessTokenBody,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic NWpmd3hycjdfd2xJUUxBZl9uZnBYVEZmTF81NmFjd1k4bV9jc2J4RFdVbDpkZWs5aWVpZg==",
      },
    })
      .then(function(response) {
        //handle success
        // expiry time
        accessTokenProp = response.data.access_token
      })
      .catch(function(response) {
        //handle error
        console.log(response)
        return alert("Failed to retrieve the Access Token")
      })
  }

  const accessToken = getAccessToken()

  const handleNewsletterSubmit = e => {
    e.preventDefault()
    const bodyFormData = {
      list_id: "rcq7eypv",
      email: newsletterEmail,
      phone: newsletterPhone,
      gender: newsletterGender,
      first_name: newsletterFirstname,
      last_name: newsletterLastname,
      name: `${newsletterFirstname} ${newsletterLastname
        .substring(0, 1)
        .toUpperCase()}.`,
      is_unsubscribed: false,
      is_blacklisted: false,
    }
    // Making Create Recipient Request
    axios({
      method: "post",
      url: "https://api.newsletter2go.com/recipients",
      data: bodyFormData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessTokenProp}`,
      },
    })
      .then(function(response) {
        //handle success
        console.log(response)
        alert("Your email has been registered")
      })
      .catch(function(response) {
        //handle error
        console.log(response)
        alert("Your email failed to register")
      })
  }

  return (
    <Layout>
      <SEO title="Home" description="An Art Exhbition website set in Berlin" />
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
            <label>Subscribe here for our newsletter</label>
            <div className="form-group row">
              <label htmlFor="first_name" className="col-2 col-form-label">
                Firstname
              </label>
              <div className="col-6">
                <input
                  type="text"
                  id="first_name"
                  className="form-control"
                  onChange={e => (newsletterFirstname = e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="last_name" className="col-2 col-form-label">
                Lastname
              </label>
              <div className="col-6">
                <input
                  type="text"
                  id="last_name"
                  className="form-control"
                  onChange={e => (newsletterLastname = e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-2 col-form-label">
                Email
              </label>
              <div className="col-6">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={e => (newsletterEmail = e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="phone" className="col-2 col-form-label">
                Tel
              </label>
              <div className="col-6">
                <input
                  type="tel"
                  className="form-control"
                  id="tel"
                  onChange={e => (newsletterPhone = e.target.value)}
                />
              </div>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                className="custom-control-input"
                type="radio"
                id="male"
                name="gender"
                value="m"
                onChange={() => {
                  newsletterGender = "m"
                }}
              />
              <label className="custom-control-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                className="custom-control-input"
                type="radio"
                name="gender"
                id="female"
                value="f"
                onChange={() => {
                  newsletterGender = "f"
                }}
              />
              <label className="custom-control-label" htmlFor="female">
                Female
              </label>
            </div>
            <button type="submit" className="btn">
              Subscribe
            </button>
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
  newsletterPhone: "",
  newsletterFirstname: "",
  newsletterLastname: "",
  newsletterGender: "",
  accessTokenProp: "",
}

IndexPage.propTypes = {
  newsletterEmail: PropTypes.string,
  newsletterPhone: PropTypes.string,
  newsletterFirstname: PropTypes.string,
  newsletterLastname: PropTypes.string,
  newsletterGender: PropTypes.string,
  accessTokenProp: PropTypes.string,
}

export default IndexPage
