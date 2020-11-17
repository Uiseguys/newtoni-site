import { r as registerInstance, h, e as Host } from './index-660b38e0.js';

const publicationsPageCss = ":host{display:block}";

const PublicationsPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
PublicationsPage.style = publicationsPageCss;

export { PublicationsPage as publications_page };
