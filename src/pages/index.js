import React, { useState, useEffect } from "react"
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
  // GraphQL queries for the latest images and posts
  const data = useStaticQuery(graphql`
    query {
      allNews(limit: 3) {
        edges {
          node {
            title
            author
            slug
            image
          }
        }
      }
      allEditions(limit: 3) {
        edges {
          node {
            title
            author
            slug
            image
          }
        }
      }
      allPublications(limit: 3) {
        edges {
          node {
            name
            slug
            image
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
      indexToast: file(ext: { eq: ".js" }, name: { eq: "toast" }) {
        publicURL
      }
    }
  `)

  const [alertOpacity, setAlertOpacity] = useState("0")
  const [alertMessage, setAlertMessage] = useState("0")
  const [alertClasses, setAlertClasses] = useState("alert alert-info")
  const [newsImageArray, setNewsImageArray] = useState([])
  const [edtImageArray, setEdtImageArray] = useState([])
  const [pubImageArray, setPubImageArray] = useState([])

  useEffect(() => {
    // Fetch Images for each post sections and save it to its respective
    if (newsImageArray.length == 0) {
      const fetchNewsImages = async () => {
        let promisedArr = await Promise.all(
          data.allNews.edges.map(async (item, index) => {
            const imgArr = JSON.parse(item.node.image)
            return await Promise.all(
              imgArr.map(async (item, index) => {
                item.url = `https://newtoni-api.herokuapp.com/${item.url}`
                return (
                  <img
                    key={crypto.randomBytes(6).toString("hex")}
                    src={item.url}
                  />
                )
              })
            ).then(res => {
              return res
            })
          })
        ).then(res => {
          setNewsImageArray(res)
        })
        return
      }
      fetchNewsImages()
    }
    if (edtImageArray.length == 0) {
      const fetchEdtImages = async () => {
        let promisedArr = await Promise.all(
          data.allEditions.edges.map(async (item, index) => {
            const imgArr = JSON.parse(item.node.image)
            return await Promise.all(
              imgArr.map(async (item, index) => {
                item.url = `https://newtoni-api.herokuapp.com/${item.url}`
                return (
                  <img
                    key={crypto.randomBytes(6).toString("hex")}
                    src={item.url}
                  />
                )
              })
            ).then(res => {
              return res
            })
          })
        ).then(res => {
          setEdtImageArray(res)
        })
        return
      }
      fetchEdtImages()
    }
    if (pubImageArray.length == 0) {
      const fetchPubImages = async () => {
        let promisedArr = await Promise.all(
          data.allPublications.edges.map(async (item, index) => {
            const imgArr = JSON.parse(item.node.image)
            return await Promise.all(
              imgArr.map(async (item, index) => {
                item.url = `https://newtoni-api.herokuapp.com/${item.url}`
                return (
                  <img
                    key={crypto.randomBytes(6).toString("hex")}
                    src={item.url}
                  />
                )
              })
            ).then(res => {
              return res
            })
          })
        ).then(res => {
          setPubImageArray(res)
        })
        return
      }
      fetchPubImages()
    }
  })

  const renderNewsPosts = () => {
    const arr = data.allNews.edges
    return arr.map((item, index) => {
      return (
        <li
          className="col-sm-12 col-md-6 col-lg-4"
          key={crypto.randomBytes(6).toString("hex")}
        >
          <figure>
            <a href={item.node.slug}>{newsImageArray[index]}</a>
            <figcaption>{item.node.title}</figcaption>
          </figure>
        </li>
      )
    })
  }

  const renderEditionsPosts = () => {
    const arr = data.allEditions.edges
    return arr.map((item, index) => {
      return (
        <li
          className="col-sm-12 col-md-6 col-lg-4"
          key={crypto.randomBytes(6).toString("hex")}
        >
          <figure>
            <a href={item.node.slug}>{edtImageArray[index]}</a>
            <figcaption>{item.node.title}</figcaption>
          </figure>
        </li>
      )
    })
  }

  const renderPublicationsPosts = () => {
    const arr = data.allPublications.edges
    return arr.map((item, index) => {
      return (
        <li
          className="col-sm-12 col-md-6 col-lg-4"
          key={crypto.randomBytes(6).toString("hex")}
        >
          <figure>
            <a href={item.node.slug}>{pubImageArray[index]}</a>
            <figcaption>{item.node.name}</figcaption>
          </figure>
        </li>
      )
    })
  }

  const handleNewsletterSubmit = e => {
    e.preventDefault()
    const bodyFormData = {
      email: newsletterEmail,
    }
    // Making Create Recipient Request
    axios({
      method: "post",
      url: "https://newtoni-api.herokuapp.com/newsletters",
      data: JSON.stringify(bodyFormData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(data => {
        //handle success
        console.log(data[0])
        setAlertClasses("alert alert-success")
        setAlertMessage("Your email has been registered successfully")
        setAlertOpacity("1")
        setTimeout(() => {
          setAlertOpacity("0")
        }, 5000)
      })
      .catch(err => {
        //handle error
        console.log(err.response.data)
        setAlertClasses("alert alert-danger")
        setAlertMessage("Your email failed to register")
        setAlertOpacity("1")
        setTimeout(() => {
          setAlertOpacity("0")
        }, 5000)
      })
  }

  return (
    <Layout>
      <SEO title="Home" description="An Art Exhbition website set in Berlin" />
      <div
        role="alert"
        className={alertClasses}
        style={{ position: "fixed", opacity: `${alertOpacity}` }}
      >
        {alertMessage}
      </div>
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
          <ul className="row list-unstyled">{renderNewsPosts()}</ul>
          <a href="/news">&gt; More News</a>
        </section>
        <section>
          <h2>Editions</h2>
          <ul className="row list-unstyled">{renderEditionsPosts()}</ul>
          <a href="/editions">&gt; More Editions</a>
        </section>
        <section>
          <h2>Publications</h2>
          <ul className="row list-unstyled">{renderPublicationsPosts()}</ul>
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
              <label htmlFor="email" className="col-2 col-form-label">
                Email
              </label>
              <div className="col-6">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={e => (newsletterEmail = e.target.value)}
                  required
                />
              </div>
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
}

IndexPage.propTypes = {
  newsletterEmail: PropTypes.string,
}

export default IndexPage
