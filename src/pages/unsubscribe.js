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
      postHomeScroll: file(ext: { eq: ".js" }, name: { eq: "postHomeScroll" }) {
        publicURL
      }
    }
  `)

  const [edtImageArray, setEdtImageArray] = useState([])

  return (
    <Layout>
      <SEO title="Unsubscribe" />
      <nav>
        <span id="editions">
          E<br />d<br />i<br />t<br />i<br />o<br />n<br />s
        </span>
      </nav>
      <Header />
      <main className="container">
        <div className="row mb-5">
          <h1 className="col-4 offset-3">
            You have Successfully Been Unsubscribed
          </h1>
        </div>
      </main>
      <script src={data.postHomeScroll.publicURL}></script>
    </Layout>
  )
}

export default EditionsPage
