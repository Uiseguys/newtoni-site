const uuid = require('uuid');
const crypto = require('crypto');
const fetch = require('node-fetch');
// https://schneckenhof4-api.herokuapp.com/Wineshttp://localhost:3000/Products
exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  const data = await fetch(
    `https://dannygrassow-api.herokuapp.com/Products`
  ).then(res => res.json());
  const type = 'Wine';
  data.map(item => {
    console.log(item);
    item.id = item.id + '';
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(item))
      .digest(`hex`);
    const nodeBase = {
      parent: null,
      children: [],
      internal: {
        contentDigest,
        type,
      },
    };
    createNode(Object.assign({}, nodeBase, item))
  });

  return
}
