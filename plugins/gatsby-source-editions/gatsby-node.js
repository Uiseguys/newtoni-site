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
      url: "https://newtoni-api.herokuapp.com/editions",
    }).then((res) => {
      return res.data
    })

    await data.forEach((item) => {
      let title = item.title.toLowerCase().replace(/\s/g, "-")
      title = title.replace(/\-?\|\|.+\|\|\-?$/g, "")
      item = {
        ...item,
        slug: `/editions/${title}`,
      }
      const nodeMeta = {
        id: createNodeId(`editions-${item.id}`),
        parent: null,
        children: [],
        internal: {
          type: "Editions",
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
