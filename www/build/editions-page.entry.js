import { r as registerInstance, h, e as Host } from './index-660b38e0.js';

const editionsPageCss = ":host{display:block}";

const EditionsPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
EditionsPage.style = editionsPageCss;

export { EditionsPage as editions_page };
