const axios = require('axios');
const rimraf = require('rimraf');
const fs = require('fs');

const fetchNews = () => {
  try {
    axios({
      method: 'get',
      url: 'https://newtoni-api.herokuapp.com/news',
    }).then(res => {
      const data = res.data.map(item => {
        let title = item.title.toLowerCase().replace(/\s/g, '-');
        title = title.replace(/\-?\|\|.+\|\|\-?$/g, '');
        item = {
          ...item,
          slug: `/news/${title}`,
        };
        return item;
      });
      const stringData = `const newsArr = ${JSON.stringify(data)}; export default newsArr;`;
      fs.writeFile('src/data/news.js', stringData, err => {
        if (err) throw err;
        console.log('News json file has been created');
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchEditions = () => {
  try {
    axios({
      method: 'get',
      url: 'https://newtoni-api.herokuapp.com/editions',
    }).then(res => {
      const data = res.data.map(item => {
        let title = item.title.toLowerCase().replace(/\s/g, '-');
        title = title.replace(/\-?\|\|.+\|\|\-?$/g, '');
        item = {
          ...item,
          slug: `/editions/${title}`,
        };
        return item;
      });
      const stringData = `const editionsArr = ${JSON.stringify(data)}; export default editionsArr;`;
      fs.writeFile('src/data/editions.js', stringData, err => {
        if (err) throw err;
        console.log('Editions json file has been created');
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchPublications = () => {
  try {
    axios({
      method: 'get',
      url: 'https://newtoni-api.herokuapp.com/publications',
    }).then(res => {
      const data = res.data.map(item => {
        let title = item.name.toLowerCase().replace(/\s/g, '-');
        title = title.replace(/\-?\|\|.+\|\|\-?$/g, '');
        item = {
          ...item,
          slug: `/publications/${title}`,
        };
        return item;
      });
      const stringData = `const publicationsArr = ${JSON.stringify(data)}; export default publicationsArr;`;
      fs.writeFile('src/data/publications.js', stringData, err => {
        if (err) throw err;
        console.log('Publications json file has been created');
      });
    });
  } catch (err) {
    console.log(err);
  }
};

rimraf('src/data/news.json', fetchNews);
rimraf('src/data/editions.json', fetchEditions);
rimraf('src/data/publications.json', fetchPublications);
