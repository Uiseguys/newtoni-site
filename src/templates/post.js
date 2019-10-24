import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"

import "../scss/pages/posts-page.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PostPage = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    query {
      allNews {
        edges {
          node {
            title
            author
            image
            post
            slug
          }
        }
      }
      allEditions {
        edges {
          node {
            title
            author
            image
            post
            slug
          }
        }
      }
      allPublications {
        edges {
          node {
            image
            name
            slug
            description
          }
        }
      }
    }
  `)

  const [postImageArray, setPostImageArray] = useState([])
  const [horizontalScrollWidth, setHorizontalScrollWidth] = useState({})

  useEffect(() => {
    // Fetch Images for each post sections and save it to its respective
    if (postImageArray.length == 0) {
      const fetchPostImages = async () => {
        let promisedArr = await Promise.all(
          pageDetails.map(async (item, index) => {
            const imgArr = JSON.parse(item.node.image)
            const gridTemplateChecker = () => {
              switch (imgArr.length) {
                case 1:
                  return "100vw"
                case 2:
                  return "100vw 100vw"
                case 3:
                  return "100vw 100vw 100vw"
                case 4:
                  return "100vw 100vw 100vw 100vw"
                case 5:
                  return "100vw 100vw 100vw 100vw 100vw"
                case 6:
                  return "100vw 100vw 100vw 100vw 100vw 100vw"
              }
            }
            setHorizontalScrollWidth({
              width: `${imgArr.length * 100}vw`,
              gridTemplateColumns: gridTemplateChecker(),
            })
            return await Promise.all(
              imgArr.map(async (item, index) => {
                item.url = `https://newtoni-api.herokuapp.com/${item.url}`
                return (
                  <figure
                    className="rellax"
                    key={crypto.randomBytes(6).toString("hex")}
                  >
                    <img src={item.url} />
                    <figcaption className="rellax">
                      {pageDetails[0].node.title || pageDetails[0].node.name}
                    </figcaption>
                  </figure>
                )
              })
            ).then(res => {
              return res
            })
          })
        ).then(res => {
          setPostImageArray(res)
        })
        return
      }
      fetchPostImages()
    }
  })

  const filterAllSlugs = () => {
    // Get all Posts
    const allSlugs = data.allNews.edges.concat(
      data.allPublications.edges.concat(data.allEditions.edges)
    )
    return allSlugs.filter(item => {
      if (pageContext.slug == item.node.slug) {
        return item
      }
    })
  }

  const pageDetails = filterAllSlugs()

  return (
    <Layout>
      <aside className="helper">Scroll Sideways</aside>
      <SEO title={pageDetails[0].node.title || pageDetails[0].node.name} />
      <header className="post-page">
        <div style={horizontalScrollWidth}>{postImageArray}</div>
      </header>
      <main className="container">
        <div className="row">
          <section className="col-6">
            <div>
              {pageDetails[0].node.post || pageDetails[0].node.description}
            </div>
          </section>
          <section className="col-6"></section>
        </div>
      </main>
    </Layout>
  )
}

export default PostPage
