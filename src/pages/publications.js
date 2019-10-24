import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"
import Header from "../components/header"
import "../scss/pages/posts-home.scss"
// import { postsHomeScroll } from "../js/scroll"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PublicationsPage = () => {
  const data = useStaticQuery(graphql`
    {
      allPublications {
        edges {
          node {
            image
            name
            slug
          }
        }
      }
      postHomeScroll: file(ext: { eq: ".js" }, name: { eq: "postHomeScroll" }) {
        publicURL
      }
    }
  `)

  const [pubImageArray, setPubImageArray] = useState([])

  useEffect(() => {
    // Fetch Images for each post sections and save it to its respective
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

  // postsHomeScroll()

  return (
    <Layout>
      <SEO title="News" />
      <nav>
        <span id="publications">
          P<br />u<br />b<br />l<br />i<br />c<br />a<br />t<br />i<br />o<br />
          n<br />s
        </span>
      </nav>
      <Header />
      <main className="container">
        <div className="row">
          <h1 className="col-4 offset-3">Latest Publications</h1>
        </div>
        <ul className="row">{renderPublicationsPosts()}</ul>
      </main>
      <script src={data.postHomeScroll.publicURL}></script>
    </Layout>
  )
}

export default PublicationsPage
