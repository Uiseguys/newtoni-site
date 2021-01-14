import { Component, State, Prop, Listen, Element, h } from '@stencil/core';
import axios from 'axios';
import Tunnel from '../../cart/cart-data/active';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss',
})
export class LandingPage {
  @Element() el: LandingPage;
  @State() alertOpacity: string = '0';
  @State() alertMessage: string = '';
  @State() alertClasses: string = 'alert alert-info';
  @State() inputValue: string = '';

  @Prop() latestNews: Array<any>;
  @Prop() latestEditions: Array<any>;
  @Prop() latestPublications: Array<any>;
  @Prop() addItem: Function;

  private newsImages: Array<any>;
  private editionsImages: Array<any>;
  private publicationsImages: Array<any>;

  private newsSection: HTMLElement;
  private editionsSection: HTMLElement;
  private publicationsSection: HTMLElement;
  private contactSection: HTMLElement;

  private newsTitle: HTMLElement;
  private editionsTitle: HTMLElement;
  private publicationsTitle: HTMLElement;

  @Listen('scroll', { target: 'window' })
  handleScroll() {
    // News section
    var news = this.newsSection.getBoundingClientRect().top;
    // Editions section
    var editions = this.editionsSection.getBoundingClientRect().top;
    // Publications section
    var publications = this.publicationsSection.getBoundingClientRect().top;
    // Contact section
    var contact = this.contactSection.getBoundingClientRect().top;

    if (news > 0) {
      this.newsTitle.setAttribute('style', 'visibility: hidden');
    }
    if (news <= 0 && editions > 0) {
      this.newsTitle.setAttribute('style', 'visibility: visible');
      this.editionsTitle.setAttribute('style', 'visibility: hidden');
    }
    if (editions <= 0 && publications > 0) {
      this.editionsTitle.setAttribute('style', 'visibility: visible');
      this.newsTitle.setAttribute('style', 'visibility: hidden');
      this.publicationsTitle.setAttribute('style', 'visibility: hidden');
    }
    if (publications <= 0 && contact > 0) {
      this.publicationsTitle.setAttribute('style', 'visibility: visible');
      this.editionsTitle.setAttribute('style', 'visibility: hidden');
    }
    if (contact <= 0) {
      this.publicationsTitle.setAttribute('style', 'visibility: hidden');
    }
  }

  getImages(arr) {
    return arr.map(item => {
      const imgArr = item.image ? JSON.parse(item.image) : [];
      return imgArr.map(item => {
        if (item) {
          return <c-image account="schneckenhof" alias={item} width="auto" height={182} crop="fill" />;
        }
        return null;
      });
    });
  }

  componentWillRender() {
    this.newsImages = this.getImages(this.latestNews);
    this.editionsImages = this.getImages(this.latestEditions);
    this.publicationsImages = this.getImages(this.latestPublications);
  }

  getPosts = (arr, type) => {
    return arr.map((item, index) => (
      <li class="col-sm-12 col-md-6 col-lg-4" key={Math.random() /*crypto.randomBytes(6).toString('hex') */}>
        <figure>
          <stencil-route-link url={item.slug}>
            {(type == 1 && this.newsImages[index]) || (type == 2 && this.editionsImages[index]) || (type == 3 && this.publicationsImages[index])}
          </stencil-route-link>
          <figcaption>{item?.name || item.title}</figcaption>
        </figure>
        {item?.price ? (
          <div class="add-to-cart text-center">
            <button class="btn p-0" onClick={_ => this.addItem({ slug: item.slug, name: item.name || item.title, price: item.price, quantity: 1 })}>
              Add to Cart - <span class="font-weight-bold">{item.price} €</span>
            </button>
          </div>
        ) : null}
      </li>
    ));
  };

  handleInputValue = e => {
    this.inputValue = e.target.value;
  };

  handleNewsletterSubmit = e => {
    e.preventDefault();
    const bodyFormData = {
      email: this.inputValue,
    };
    // Making Create Recipient Request
    axios({
      method: 'post',
      url: 'https://newtoni-api.herokuapp.com/newsletters',
      data: JSON.stringify(bodyFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(_ => {
        //handle success
        this.alertClasses = 'alert alert-success';
        this.alertMessage = 'Your email has been registered successfully';
        this.alertOpacity = '1';
        setTimeout(() => {
          this.alertOpacity = '0';
        }, 5000);
      })
      .catch(() => {
        //handle error
        this.alertClasses = 'alert alert-danger';
        this.alertMessage = 'Your email failed to register';
        this.alertOpacity = '1';
        setTimeout(() => {
          this.alertOpacity = '0';
        }, 5000);
      });
  };

  render() {
    return (
      <layout-index page-title="Home" description="An Art Exhbition website set in Berlin">
        <div role="alert" class={this.alertClasses} style={{ position: 'fixed', opacity: `${this.alertOpacity}` }}>
          {this.alertMessage}
        </div>
        <nav>
          <span ref={el => (this.newsTitle = el as HTMLElement)}>
            N<br />e<br />w<br />s
          </span>
          <span ref={el => (this.editionsTitle = el as HTMLElement)}>
            E<br />d<br />i<br />t<br />i<br />o<br />n<br />s
          </span>
          <span ref={el => (this.publicationsTitle = el as HTMLElement)}>
            P<br />u<br />b<br />l<br />i<br />c<br />a<br />t<br />i<br />o<br />
            n<br />s
          </span>
        </nav>
        <layout-header />
        <div class="landing-page container">
          <section ref={el => (this.newsSection = el as HTMLElement)}>
            <h2>News</h2>
            <ul class="row list-unstyled">{this.getPosts(this.latestNews, 1)}</ul>
            <stencil-route-link url="/news">&gt; More News</stencil-route-link>
          </section>
          <section ref={el => (this.editionsSection = el as HTMLElement)}>
            <h2>Editions</h2>
            <ul class="row list-unstyled">{this.getPosts(this.latestEditions, 2)}</ul>
            <stencil-route-link url="/editions">&gt; More Editions</stencil-route-link>
          </section>
          <section ref={el => (this.publicationsSection = el as HTMLElement)}>
            <h2>Publications</h2>
            <ul class="row list-unstyled">{this.getPosts(this.latestPublications, 3)}</ul>
            <stencil-route-link url="/publications">&gt; More Publications</stencil-route-link>
          </section>
          <section ref={el => (this.contactSection = el as HTMLElement)}>
            <h2>Contact</h2>
            <aside>
              <p>
                New Toni Press <br />
                Immanuelkirchstrasse 15
                <br />
                10407 Berlin
                <br />
                mail@newtoni.press
              </p>
            </aside>
          </section>
          <section>
            <h2>Newsletter</h2>
            <form onSubmit={e => this.handleNewsletterSubmit(e)}>
              <label>Subscribe here for our newsletter</label>
              <div class="form-group row">
                <label htmlFor="email" class="col-2 col-form-label">
                  Email
                </label>
                <div class="col-6">
                  <input type="email" class="form-control" id="email" value={this.inputValue} onChange={e => this.handleInputValue(e)} required />
                </div>
              </div>
              <button type="submit" class="btn">
                Subscribe
              </button>
            </form>
          </section>
          <section>
            <h2>Imprint</h2>
            <aside>
              <p>responsible for this website are Thomas Hesse and Felix Toth</p>
              <p>
                New Toni Press <br />
                Immanuelkirchstrasse 15
                <br />
                10407 Berlin
                <br />
                contact@newtoni.press
              </p>
            </aside>
          </section>
        </div>
      </layout-index>
    );
  }
}

Tunnel.injectProps(LandingPage, ['addItem']);
