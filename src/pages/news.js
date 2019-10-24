import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"
import Header from "../components/header"
import "../scss/pages/posts-home.scss"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NewsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allNews {
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

  const [newsImageArray, setNewsImageArray] = useState([])

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

  // postsHomeScroll()

  return (
    <Layout>
      <SEO title="News" />
      <nav>
        <span id="news">
          N<br />e<br />w<br />s
        </span>
      </nav>
      <Header />
      <main className="container">
        <div className="row">
          <h1 className="col-4 offset-3">Latest News</h1>
        </div>
        <ul className="row">{renderNewsPosts()}</ul>
      </main>
      <script src={data.postHomeScroll.publicURL}></script>
    </Layout>
  )
}

export default NewsPage
