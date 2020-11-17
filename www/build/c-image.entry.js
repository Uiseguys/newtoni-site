import { r as registerInstance, h } from './index-660b38e0.js';

const cImageCss = "";

const CloudinaryImage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.render = () => {
      if (this.alias && this.account)
        return h("img", { src: this.cloudinary_url, sizes: this.sizes });
    };
  }
  generateImageUrl() {
    const gravity = this.gravity ? `g_${this.gravity},` : '';
    const crop = this.crop ? `c_${this.crop},` : '';
    const width = this.width ? `w_${this.width},` : '';
    const height = this.height ? `h_${this.height},` : '';
    const transformations = `${gravity}${crop}${height}${width}q_auto,f_auto,dpr_auto,fl_progressive`;
    this.cloudinary_url = `https://res.cloudinary.com/${this.account}/image/upload/${transformations}/v1/${this.alias}`;
  }
  watchWidth(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.generateImageUrl();
    }
  }
  watchHeight(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.generateImageUrl();
    }
  }
  componentWillLoad() {
    this.generateImageUrl();
  }
  static get watchers() { return {
    "width": ["watchWidth"],
    "height": ["watchHeight"]
  }; }
};
CloudinaryImage.style = cImageCss;

export { CloudinaryImage as c_image };
