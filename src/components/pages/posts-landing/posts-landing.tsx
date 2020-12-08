import { Component, Prop, Listen, State, h } from '@stencil/core';
import Fragment from 'stencil-fragment';

@Component({
  tag: 'posts-landing',
  styleUrl: 'posts-landing.scss',
})
export class PostsLanding {
  @Prop() heading: Array<any>;
  @Prop() posts: Array<any>;
  @Prop() type: string | undefined;

  @State() renderedPosts: Array<any>;

  @Listen('scroll', { target: 'window' })
  handleScroll() {
    const main = window.scrollY;
    // Editions section
    if (main > 0) {
      this.postTitle.setAttribute('style', 'visibility: visible');
    }
    if (main <= 0) {
      this.postTitle.setAttribute('style', 'visibility: hidden');
    }
  }

  private renderedImages: Array<any>;
  private postTitle: HTMLElement;
  private postContainer: HTMLElement;

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
      <layout-index
        ref={el => (this.postContainer = el as HTMLElement)}
        page-title={this.type == 'publications' ? 'Publications' : this.type == 'editions' ? 'Editions' : 'News'}
        description={`These are the latest ${this.type == 'publications' ? 'Publications' : this.type == 'editions' ? 'Editions' : 'News'} available at New Toni`}
      >
        <nav>
          <span ref={el => (this.postTitle = el as HTMLElement)}>
            {this.type == 'publications' ? (
              <Fragment>
                P<br />u<br />b<br />l<br />i<br />c<br />a<br />t<br />i<br />o<br />n<br />s
              </Fragment>
            ) : this.type == 'editions' ? (
              <Fragment>
                E<br />d<br />i<br />t<br />i<br />o<br />n<br />s
              </Fragment>
            ) : (
              <Fragment>
                N<br />e<br />w<br />s
              </Fragment>
            )}
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
