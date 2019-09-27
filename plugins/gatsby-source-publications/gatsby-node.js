const axios = require("axios")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  try {
    const { createNode } = actions
    const data = await axios({
      method: "get",
      url: "https://newtoni-api.herokuapp.com/publications",
    }).then(res => {
      return res.data
    })
    data.map(async item => {
      item = {
        ...item,
        slug: `/publications/${item.name.toLowerCase().replace(/\s/g, "-")}`,
      }
      const nodeMeta = {
        id: createNodeId(`publications-${item.id}`),
        parent: null,
        children: [],
        internal: {
          type: "Publications",
          mediaType: `application/json`,
          content: JSON.stringify(item),
          contentDigest: createContentDigest(item),
        },
      }
      const node = Object.assign({}, item, nodeMeta)
      createNode(node)
      return
    })
  } catch (err) {
    console.log(err)
  }
}
