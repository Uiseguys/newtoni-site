import { Component, State, Prop, h } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss',
})
export class LandingPage {
  @State() alertOpacity: string = '0';
  @State() alertMessage: string = '';
  @State() alertClasses: string = 'alert alert-info';
  @State() inputValue: string = '';

  @Prop() latestNews: Array<any>;
  @Prop() latestEditions: Array<any>;
  @Prop() latestPublications: Array<any>;

  private newsImages: Array<any>;
  private editionsImages: Array<any>;
  private publicationsImages: Array<any>;

  getImages(arr) {
    return arr.map(item => {
      const imgArr = item.image ? JSON.parse(item.image) : [];
      return imgArr.map(item => {
        if (item) {
          return <c-image account="schneckenhof" alias={item} width="auto" height={182} crop="scale" />;
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
        <layout-header />
        <div class="landing-page container">
          <section>
            <h2>News</h2>
            <ul class="row list-unstyled">{this.getPosts(this.latestNews, 1)}</ul>
            <stencil-route-link url="/news">&gt; More News</stencil-route-link>
          </section>
          <section>
            <h2>Editions</h2>
            <ul class="row list-unstyled">{this.getPosts(this.latestEditions, 2)}</ul>
            <stencil-route-link url="/editions">&gt; More Editions</stencil-route-link>
          </section>
          <section>
            <h2>Publications</h2>
            <ul class="row list-unstyled">{this.getPosts(this.latestPublications, 3)}</ul>
            <stencil-route-link url="/publications">&gt; More Publications</stencil-route-link>
          </section>
          <section>
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
