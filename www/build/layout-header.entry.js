import { r as registerInstance, h } from './index-660b38e0.js';

const layoutHeaderCss = "header img{display:block;margin:0 auto;width:60%;max-width:960px}";

const LayoutHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("header", null, h("stencil-route-link", { url: "/", exact: true }, h("img", { src: "/assets/svg/newtoni.svg" }))));
  }
};
LayoutHeader.style = layoutHeaderCss;

export { LayoutHeader as layout_header };
