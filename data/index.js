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
          type: 'news',
        };
        return item;
      });
      const stringData = `const newsArr = ${JSON.stringify(
        data.sort((a, b) => {
          const dateA = Date.parse(a.update_time ? a.update_time : a.create_time);
          const dateB = Date.parse(b.update_time ? b.update_time : b.create_time);
          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;
          return 0;
        }),
      )}; export default newsArr;`;
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
          type: 'editions',
        };
        return item;
      });
      const stringData = `const editionsArr = ${JSON.stringify(
        data.sort((a, b) => {
          const dateA = Date.parse(a.update_time ? a.update_time : a.create_time);
          const dateB = Date.parse(b.update_time ? b.update_time : b.create_time);
          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;
          return 0;
        }),
      )}; export default editionsArr;`;
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
          type: 'publications',
        };
        return item;
      });
      const stringData = `const publicationsArr = ${JSON.stringify(
        data.sort((a, b) => {
          if (a.id < b.id) return 1;
          if (a.id > b.id) return -1;
          return 0;
        }),
      )}; export default publicationsArr;`;
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
