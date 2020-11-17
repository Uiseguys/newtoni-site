import { r as registerInstance, h, e as Host } from './index-660b38e0.js';

const newsPageCss = ":host{display:block}";

const NewsPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("h1", null, "This is the News Page"), h("slot", null)));
  }
};
NewsPage.style = newsPageCss;

export { NewsPage as news_page };
