import { r as registerInstance, h } from './index-660b38e0.js';

const layoutFooterCss = "footer{text-align:center;padding-bottom:3vh}footer img{display:block;margin:auto;width:100%;height:30vh;position:relative}";

const LayoutFooter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("footer", null, h("img", { src: "/assets/svg/newtoni.svg" }), "\u00A9 copyright ", new Date().getFullYear(), " New toni Press"));
  }
};
LayoutFooter.style = layoutFooterCss;

export { LayoutFooter as layout_footer };
