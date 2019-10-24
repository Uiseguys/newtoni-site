import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"
import Header from "../components/header"
import "../scss/pages/posts-home.scss"
// import { postsHomeScroll } from "../js/scroll"

import Layout from "../components/layout"
import SEO from "../components/seo"

const EditionsPage = () => {
  const data = useStaticQuery(graphql`
    {
      allEditions {
        edges {
          node {
            id
            title
            image
            slug
          }
        }
      }
      postHomeScroll: file(ext: { eq: ".js" }, name: { eq: "postHomeScroll" }) {
        publicURL
      }
    }
  `)

  const [edtImageArray, setEdtImageArray] = useState([])

  useEffect(() => {
    // Fetch Images for each post sections and save it to its respective
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
  })

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
            <figcaption>
              <i>{item.node.title}</i>
              <small>{item.node.author}</small>
              <br />
              <small>{item.node.date}</small>
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
        <span id="editions">
          E<br />d<br />i<br />t<br />i<br />o<br />n<br />s
        </span>
      </nav>
      <Header />
      <main className="container">
        <div className="row">
          <h1 className="col-4 offset-3">Latest Editions</h1>
        </div>
        <ul className="row">{renderEditionsPosts()}</ul>
      </main>
      <script src={data.postHomeScroll.publicURL}></script>
    </Layout>
  )
}

export default EditionsPage
