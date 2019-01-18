module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter'
  },
  plugins: [
    'gatsby-source-wines',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-postcss-sass',
    'gatsby-plugin-glamor',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-3744376-1',
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: []
      }
    }
  ]
}
