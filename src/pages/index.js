import React, { useState, useEffect, useMemo } from "react"
import crypto from "crypto"
import axios from "axios"
import { Image, Transformation } from "cloudinary-react"

import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

// Import Home index styling
import "../scss/pages/index.scss"

const IndexPage = () => {
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

  const newsImages = useMemo(() => {
    const arr = data.allNews.edges
    return arr.map((item, index) => {
      const imgArr = item.node.image ? JSON.parse(item.node.image) : []
      return imgArr.map((item, index) => {
        if (item) {
          return (
            <Image
              key={crypto.randomBytes(6).toString("hex")}
              cloudName="schneckenhof"
              publicId={item}
              secure="true"
            >
              <Transformation
                width="auto"
                height="182"
                crop="scale"
              ></Transformation>
            </Image>
          )
        }
        return null
      })
    })
  }, [data.allNews.edges])
  const editionImages = useMemo(() => {
    const arr = data.allEditions.edges
    return arr.map((item, index) => {
      const imgArr = item.node.image ? JSON.parse(item.node.image) : []
      return imgArr.map((item, index) => {
        if (item) {
          return (
            <Image
              key={crypto.randomBytes(6).toString("hex")}
              cloudName="schneckenhof"
              publicId={item}
              secure="true"
            >
              <Transformation
                width="auto"
                height="182"
                crop="scale"
              ></Transformation>
            </Image>
          )
        }
        return null
      })
    })
  }, [data.allEditions.edges])
  const publicationImages = useMemo(() => {
    const arr = data.allPublications.edges
    return arr.map((item, index) => {
      const imgArr = item.node.image ? JSON.parse(item.node.image) : []
      return imgArr.map((item, index) => {
        if (item) {
          return (
            <Image
              key={crypto.randomBytes(6).toString("hex")}
              cloudName="schneckenhof"
              publicId={item}
              secure="true"
            >
              <Transformation
                width="auto"
                height="182"
                crop="scale"
              ></Transformation>
            </Image>
          )
        }
        return null
      })
    })
  }, [data.allPublications.edges])

  const [alertOpacity, setAlertOpacity] = useState("0")
  const [alertMessage, setAlertMessage] = useState("")
  const [alertClasses, setAlertClasses] = useState("alert alert-info")
  const [inputValue, setInputValue] = useState("")

  const renderNewsPosts = useMemo(() => {
    const arr = data.allNews.edges
    return arr.map((item, index) => {
      return (
        <li
          className="col-sm-12 col-md-6 col-lg-4"
          key={crypto.randomBytes(6).toString("hex")}
        >
          <figure>
            <a href={item.node.slug}>{newsImages[index]}</a>
            <figcaption>{item.node.title}</figcaption>
          </figure>
        </li>
      )
    })
  }, [data.allNews.edges])

  const renderEditionsPosts = useMemo(() => {
    const arr = data.allEditions.edges
    return arr.map((item, index) => {
      return (
        <li
          className="col-sm-12 col-md-6 col-lg-4"
          key={crypto.randomBytes(6).toString("hex")}
        >
          <figure>
            <a href={item.node.slug}>{editionImages[index]}</a>
            <figcaption>{item.node.title}</figcaption>
          </figure>
        </li>
      )
    })
  }, [data.allEditions.edges])

  const renderPublicationsPosts = useMemo(() => {
    const arr = data.allPublications.edges
    return arr.map((item, index) => {
      return (
        <li
          className="col-sm-12 col-md-6 col-lg-4"
          key={crypto.randomBytes(6).toString("hex")}
        >
          <figure>
            <a href={item.node.slug}>{publicationImages[index]}</a>
            <figcaption>{item.node.name}</figcaption>
          </figure>
        </li>
      )
    })
  }, [data.allPublications.edges])

  const handleInputValue = (value) => {
    setInputValue(value)
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const bodyFormData = {
      email: inputValue,
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
      .then((data) => {
        //handle success
        setAlertClasses("alert alert-success")
        setAlertMessage("Your email has been registered successfully")
        setAlertOpacity("1")
        setTimeout(() => {
          setAlertOpacity("0")
        }, 5000)
      })
      .catch(() => {
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
          <ul className="row list-unstyled">{renderNewsPosts}</ul>
          <a href="/news">&gt; More News</a>
        </section>
        <section>
          <h2>Editions</h2>
          <ul className="row list-unstyled">{renderEditionsPosts}</ul>
          <a href="/editions">&gt; More Editions</a>
        </section>
        <section>
          <h2>Publications</h2>
          <ul className="row list-unstyled">{renderPublicationsPosts}</ul>
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
          <form onSubmit={(e) => handleNewsletterSubmit(e)}>
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
                  value={inputValue}
                  onChange={(e) => handleInputValue(e.target.value)}
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

export default IndexPage
