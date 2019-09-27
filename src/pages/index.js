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
            const imgKeyArr = await randomCryptoKey(imgArr)
            return await Promise.all(
              imgArr.map(async (item, index) => {
                let signedurl = await axios({
                  method: "get",
                  url: `https://newtoni-api.herokuapp.com/storage/file/${item.id}`,
                }).then(res => {
                  return res.data.url
                })
                return <img key={imgKeyArr[index]} src={signedurl} />
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
            const imgKeyArr = await randomCryptoKey(imgArr)
            return await Promise.all(
              imgArr.map(async (item, index) => {
                let signedurl = await axios({
                  method: "get",
                  url: `https://newtoni-api.herokuapp.com/storage/file/${item.id}`,
                }).then(res => {
                  return res.data.url
                })
                return <img key={imgKeyArr[index]} src={signedurl} />
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
        const pubKeyArr = await randomCryptoKey(data.allPublications.edges)
        let promisedArr = await Promise.all(
          data.allPublications.edges.map(async (item, index) => {
            const imgArr = JSON.parse(item.node.image)
            const imgKeyArr = await randomCryptoKey(imgArr)
            return await Promise.all(
              imgArr.map(async (item, index) => {
                let signedurl = await axios({
                  method: "get",
                  url: `https://newtoni-api.herokuapp.com/storage/file/${item.id}`,
                }).then(res => {
                  return res.data.url
                })
                return <img key={imgKeyArr[index]} src={signedurl} />
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

  const randomCryptoKey = arr => {
    let keyArr = []
    for (let i = 0; i < arr.length; i++) {
      keyArr[i] = crypto.randomBytes(6).toString("hex")
    }
    return keyArr
  }

  const renderNewsPosts = () => {
    const arr = data.allNews.edges
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
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
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
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
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-sm-12 col-md-6 col-lg-4" key={keyArr[index]}>
          <figure>
            <a href={item.node.slug}>{pubImageArray[index]}</a>
            <figcaption>{item.node.name}</figcaption>
          </figure>
        </li>
      )
    })
  }

  // Get the Access Token from the Newsletter 2go Website
  // Retrieve access token and save at the accessTokenProp
  // After which instantiate it
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
      })
  }
  getAccessToken()

  // Intializing Bootstrap toasts via jQuery

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
      .then(function() {
        //handle success
        setAlertClasses("alert alert-success")
        setAlertMessage("Your email has been registered successfully")
        setAlertOpacity("1")
        setTimeout(() => {
          setAlertOpacity("0")
        }, 5000)
      })
      .catch(function() {
        //handle error
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
              <label htmlFor="first_name" className="col-2 col-form-label">
                Firstname
              </label>
              <div className="col-6">
                <input
                  type="text"
                  id="first_name"
                  className="form-control"
                  onChange={e => (newsletterFirstname = e.target.value)}
                  required
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
                  required
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
                  required
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
                  required
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
                required
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
                required
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
