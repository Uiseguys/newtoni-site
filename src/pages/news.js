import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import axios from "axios"
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
  })

  const randomCryptoKey = len => {
    let keyArr = []
    for (let i = 0; i < len; i++) {
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
