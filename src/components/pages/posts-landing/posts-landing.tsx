import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'posts-landing',
  styleUrl: 'posts-landing.scss',
})
export class PostsLanding {
  @Prop() heading: Array<any>;
  @Prop() posts: Array<any>;
  @State() renderedPosts: Array<any>;

  private renderedImages: Array<any>;

  postImages = () => {
    return this.posts.map(item => {
      const imgArr = item.image ? JSON.parse(item.image) : [];
      return imgArr.map(img => {
        if (item) {
          return <c-image account="schneckenhof" alias={img} width="auto" height={182} crop="scale" />;
        }
        return null;
      });
    });
  };

  allPosts = () => {
    return this.posts.map((item, index) => {
      return (
        <li class="col-sm-12 col-md-6 col-lg-4">
          <figure>
            <stencil-route-link url={item.slug}>{this.renderedImages[index]}</stencil-route-link>
            <figcaption>{item.title}</figcaption>
          </figure>
        </li>
      );
    });
  };

  componentWillRender() {
    this.renderedImages = this.postImages();
    this.renderedPosts = this.allPosts();
  }

  // postsHomeScroll()

  render() {
    return (
      <layout-index>
        <nav>
          <span id="news">
            N<br />e<br />w<br />s
          </span>
        </nav>
        <layout-header />
        <div class="container posts-landing">
          <div class="row">
            <h1 class="col-4 offset-3">{this.heading}</h1>
          </div>
          <ul class="row">{this.renderedPosts}</ul>
        </div>
      </layout-index>
    );
  }
}
