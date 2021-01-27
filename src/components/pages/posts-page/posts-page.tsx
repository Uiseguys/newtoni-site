import { Component, Prop, Element, h } from '@stencil/core';
import Tunnel from '../../cart/cart-data/active';

@Component({
  tag: 'posts-page',
  styleUrl: 'posts-page.scss',
})
export class PostsPage {
  @Element() el: PostsPage;
  @Prop() post: any;
  @Prop() addItem: Function;

  componentWillLoad = () => {
    if (this.post?.image) {
      const width = Math.round(window.innerWidth);
      const height = Math.round(window.innerHeight);
      this.post.image = JSON.parse(this.post.image).reduce((acc, img) => {
        if (img) {
          acc.push(
            <div class="carousel-item">
              <c-image account="schneckenhof" alias={img} width={width} height={height} crop="fill" />
            </div>,
          );
        }
        return acc;
      }, []);
    } else {
      this.post.image = [];
    }
  };

  render() {
    return (
      <layout-index page-title={this.post?.name || this.post?.title}>
        {this.post.image.length > 0 ? (
          <c-slider class="post-page-slider" touch-scrollable={true} slider-lang="en" path={this.post.slug} slides={this.post.image.length}>
            {this.post.image}
          </c-slider>
        ) : (
          <div class="post-page-slider no-images">
            <img src="/assets/svg/newtoni.svg" />
          </div>
        )}
        <cart-menu />
        <main class="container">
          <div class="row">
            <section class="col-6">
              <div innerHTML={this.post?.post || this.post?.description}></div>
              {this.post?.price ? (
                <button
                  class="btn p-0"
                  onClick={_ =>
                    this.addItem({
                      slug: this.post.slug,
                      name: this.post?.name || this.post?.title,
                      description: this.post?.description || this.post?.post,
                      price: this.post.price,
                      quantity: 1,
                    })
                  }
                >
                  Add to Cart - <span class="font-weight-bold">{this.post.price} €</span>
                </button>
              ) : null}
            </section>
            <section class="col-6"></section>
          </div>
        </main>
      </layout-index>
    );
  }
}

Tunnel.injectProps(PostsPage, ['addItem']);
