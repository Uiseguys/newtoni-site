import { r as registerInstance, h } from './index-660b38e0.js';

const postsPageCss = "@import url(\"https://fonts.googleapis.com/css?family=Nunito+Sans|Playfair+Display:400,400i,700,700i,900,900i\");body{overflow-x:hidden}header.post-page{margin:0;background-color:#eee;background-size:cover;width:100vw;height:100vh;overflow-x:scroll}header.post-page div{display:grid;height:100%;justify-content:start;align-items:center}header.post-page div figure{max-width:50vw;margin:0 auto;background:rgba(255, 255, 255, 0.8);padding:2em;border:1px solid #ddd;box-shadow:0 0 2em -0.5em #aaa;position:relative}header.post-page div figure img{max-width:100%;max-height:70vh}header.post-page div figure figcaption{font-family:\"Playfair Display\";font-weight:900;font-size:3em;font-style:italic;text-align:right;text-shadow:0 0 1em #555;text-shadow:0 0 0.5em white;position:absolute;right:-2rem;bottom:-2rem}.helper{position:absolute;top:0;left:0;margin:1rem;text-align:center;font-family:\"Nunito Sans\";opacity:0.45;font-size:1.2em;transition:opacity, 0.15s}.helper:hover{opacity:1}";

const PostsPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.postImages = () => JSON.parse(this.post.image).map(img => {
      var _a, _b;
      if (img) {
        return (h("figure", { class: "rellax" }, h("c-image", { account: "schneckenhof", alias: img, width: "auto:100", crop: "scale" }), h("figcaption", { class: "rellax" }, ((_a = this.post) === null || _a === void 0 ? void 0 : _a.name) || ((_b = this.post) === null || _b === void 0 ? void 0 : _b.title))));
      }
      return null;
    });
    this.rellaxStyles = () => {
      const widthMap = new Map();
      widthMap.set(1, '100vw');
      widthMap.set(2, '100vw 100vw');
      widthMap.set(3, '100vw 100vw 100vw');
      widthMap.set(4, '100vw 100vw 100vw 100vw');
      widthMap.set(5, '100vw 100vw 100vw 100vw 100vw 100vw');
      widthMap.set(6, '100vw 100vw 100vw 100vw 100vw 100vw 100vw');
      let stylesObj = {};
      if (this.post.image.length > 0) {
        stylesObj['width'] = `${this.post.image.length * 100}vw`;
        stylesObj['gridTemplateColumns'] = widthMap.get(this.post.image.length);
      }
      else {
        stylesObj['width'] = '100vw';
        stylesObj['gridTemplateColumns'] = '100vw';
      }
      return stylesObj;
    };
  }
  render() {
    var _a, _b, _c, _d;
    return (h("layout-index", { title: ((_a = this.post) === null || _a === void 0 ? void 0 : _a.name) || ((_b = this.post) === null || _b === void 0 ? void 0 : _b.title) }, h("aside", { class: "helper" }, "Scroll Sideways"), h("header", { class: "post-page" }, h("div", { style: this.rellaxStyles() }, this.postImages())), h("main", { class: "container" }, h("div", { class: "row" }, h("section", { class: "col-6" }, h("div", { innerHTML: ((_c = this.post) === null || _c === void 0 ? void 0 : _c.post) || ((_d = this.post) === null || _d === void 0 ? void 0 : _d.description) })), h("section", { class: "col-6" })))));
  }
};
PostsPage.style = postsPageCss;

export { PostsPage as posts_page };
