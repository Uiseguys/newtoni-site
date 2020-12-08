import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'posts-page',
  styleUrl: 'posts-page.scss',
  shadow: true,
})
export class PostsPage {
  @Prop() post;

  postImages = () =>
    JSON.parse(this.post.image).map(img => {
      if (img) {
        return (
          <figure class="rellax">
            <c-image account="schneckenhof" alias={img} width="auto:100" crop="scale" />
            <figcaption class="rellax">{this.post?.name || this.post?.title}</figcaption>
          </figure>
        );
      }
      return null;
    });

  rellaxStyles = () => {
    const widthMap = new Map();
    const imageLen = JSON.parse(this.post.image).length;
    let stylesObj = {};
    widthMap.set(1, '100vw');
    widthMap.set(2, '100vw 100vw');
    widthMap.set(3, '100vw 100vw 100vw');
    widthMap.set(4, '100vw 100vw 100vw 100vw');
    widthMap.set(5, '100vw 100vw 100vw 100vw 100vw 100vw');
    widthMap.set(6, '100vw 100vw 100vw 100vw 100vw 100vw 100vw');
    if (imageLen > 0) {
      stylesObj['width'] = `${imageLen * 100}vw`;
      stylesObj['gridTemplateColumns'] = widthMap.get(imageLen);
    } else {
      stylesObj['width'] = '100vw';
      stylesObj['gridTemplateColumns'] = '100vw';
    }
    return stylesObj;
  };

  render() {
    return (
      <layout-index title={this.post?.name || this.post?.title}>
        <aside class="helper">Scroll Sideways</aside>
        <header class="post-page">
          <div style={this.rellaxStyles()}>{this.postImages()}</div>
        </header>
        <main class="container">
          <div class="row">
            <section class="col-6">
              <div innerHTML={this.post?.post || this.post?.description}></div>
            </section>
            <section class="col-6"></section>
          </div>
        </main>
      </layout-index>
    );
  }
}
