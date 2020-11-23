import { r as registerInstance, h } from './index-660b38e0.js';

const postsLandingCss = "nav{position:fixed}nav span{visibility:hidden;position:absolute;font-size:2rem;top:1vh;left:3vw}@keyframes showMe{0%{visibility:visible;z-index:100}25%{visibility:hidden;z-index:0}50%{visibility:hidden;z-index:0}75%{visibility:hidden;z-index:0}100%{visibility:visible;z-index:100}}.posts-landing div.row h1{text-align:left;padding-left:0}.posts-landing ul.row{list-style:none !important;margin:0 !important;padding:0 !important;width:100%}.posts-landing ul.row li{height:30vh;width:100%;padding:0;margin-bottom:0;overflow:hidden}.posts-landing ul.row li:nth-child(1){border-right:inset 20px transparent}.posts-landing ul.row li:nth-child(2){border-left:inset 10px transparent;border-right:inset 10px transparent}.posts-landing ul.row li:nth-child(3){border-left:inset 20px transparent}.posts-landing ul.row li:hover{cursor:pointer}.posts-landing ul.row li:hover figure img{animation-play-state:running}.posts-landing ul.row li:hover figcaption{opacity:1;box-shadow:0 0 0 5px rgba(255, 255, 255, 0.3) inset}.posts-landing ul.row li figure a img{max-height:40vh !important;top:0;left:0;position:absolute;animation:showMe 4s linear infinite 0s forwards;animation-play-state:paused}.posts-landing ul.row li figure a img:nth-child(1){z-index:9}.posts-landing ul.row li figure a img:nth-child(2){animation-delay:1s;z-index:8}.posts-landing ul.row li figure a img:nth-child(3){animation-delay:2s;z-index:7}.posts-landing ul.row li figure a img:nth-child(4){animation-delay:3s;z-index:6}.posts-landing ul.row li figure a img:nth-child(2),.posts-landing ul.row li figure a img:nth-child(3),.posts-landing ul.row li figure a img:nth-child(4){visibility:hidden}.posts-landing ul.row li figure figcaption{margin-top:42vh;opacity:0;z-index:500;background:rgba(255, 255, 255, 0.3) inset;pointer-events:none;text-align:center;vertical-align:middle;transition:all 0.3s linear}.posts-landing ul.row li figure figcaption h3{margin-top:10vh}";

const PostsLanding = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.postImages = () => {
      return this.posts.map(item => {
        const imgArr = item.image ? JSON.parse(item.image) : [];
        return imgArr.map(img => {
          if (item) {
            return h("c-image", { account: "schneckenhof", alias: img, width: "auto", height: 182, crop: "scale" });
          }
          return null;
        });
      });
    };
    this.allPosts = () => {
      return this.posts.map((item, index) => {
        return (h("li", { class: "col-sm-12 col-md-6 col-lg-4" }, h("figure", null, h("stencil-route-link", { url: item.slug }, this.renderedImages[index]), h("figcaption", null, item.title))));
      });
    };
  }
  componentWillRender() {
    this.renderedImages = this.postImages();
    this.renderedPosts = this.allPosts();
  }
  // postsHomeScroll()
  render() {
    return (h("layout-index", null, h("nav", null, h("span", { id: "news" }, "N", h("br", null), "e", h("br", null), "w", h("br", null), "s")), h("layout-header", null), h("div", { class: "container posts-landing" }, h("div", { class: "row" }, h("h1", { class: "col-4 offset-3" }, this.heading)), h("ul", { class: "row" }, this.renderedPosts))));
  }
};
PostsLanding.style = postsLandingCss;

export { PostsLanding as posts_landing };
