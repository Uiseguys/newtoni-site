import { Component, State, h } from '@stencil/core';
import axios from 'axios';
import newsArr from '../../../data/news';
import editionsArr from '../../../data/editions';
import publicationsArr from '../../../data/publications.js';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss',
  shadow: true,
})
export class LandingPage {
  @State() alertOpacity: string = '0';
  @State() alertMessage: string = '';
  @State() alertClasses: string = 'alert alert-info';
  @State() inputValue: string = '';

  componentWillRender() {
    console.log(newsArr);
    this.newsImages = this.newsImages();
    this.editionImages = this.editionImages();
    this.publicationImages = this.publicationImages();
  }

  newsImages = () => {
    return newsArr.map((item, index) => {
      const imgArr = item.image ? JSON.parse(item.image) : [];
      return imgArr.map((item, index) => {
        if (item) {
          return <c-image account="schneckenhof" alias={item} width="auto" height={182} crop="scale" />;
        }
        return null;
      });
    });
  };

  editionImages = () => {
    return editionsArr.map((item, index) => {
      const imgArr = item.image ? JSON.parse(item.image) : [];
      return imgArr.map((item, index) => {
        if (item) {
          return <c-image account="schneckenhof" alias={item} width="auto" height={182} crop="scale" />;
        }
        return null;
      });
    });
  };

  publicationImages = () => {
    return publicationsArr.map((item, index) => {
      const imgArr = item.image ? JSON.parse(item.image) : [];
      return imgArr.map((item, index) => {
        if (item) {
          return <c-image account="schneckenhof" alias={item} width="auto" height={182} crop="scale" />;
        }
        return null;
      });
    });
  };

  renderNewsPosts = () => {
    return newsArr.map((item, index) => {
      return (
        <li class="col-sm-12 col-md-6 col-lg-4" key={Math.random() /*crypto.randomBytes(6).toString('hex') */}>
          <figure>
            <a href={item.slug}>{this.newsImages[index]}</a>
            <figcaption>{item.title}</figcaption>
          </figure>
        </li>
      );
    });
  };

  renderEditionsPosts = () => {
    return editionsArr.map((item, index) => {
      return (
        <li class="col-sm-12 col-md-6 col-lg-4" key={Math.random() /* crypto.randomBytes(6).toString('hex') */}>
          <figure>
            <a href={item.slug}>{this.editionImages[index]}</a>
            <figcaption>{item.title}</figcaption>
          </figure>
        </li>
      );
    });
  };

  renderPublicationsPosts = () => {
    return publicationsArr.map((item, index) => {
      return (
        <li class="col-sm-12 col-md-6 col-lg-4" key={Math.random() /* crypto.randomBytes(6).toString('hex') */}>
          <figure>
            <a href={item.slug}>{this.publicationImages[index]}</a>
            <figcaption>{item.name}</figcaption>
          </figure>
        </li>
      );
    });
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
      .then(data => {
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
        <main class="container">
          <section>
            <h2>News</h2>
            <ul class="row list-unstyled">{this.renderNewsPosts()}</ul>
            <a href="/news">&gt; More News</a>
          </section>
          <section>
            <h2>Editions</h2>
            <ul class="row list-unstyled">{this.renderEditionsPosts()}</ul>
            <a href="/editions">&gt; More Editions</a>
          </section>
          <section>
            <h2>Publications</h2>
            <ul class="row list-unstyled">{this.renderPublicationsPosts()}</ul>
            <a href="/publications">&gt; More Publications</a>
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
        </main>
      </layout-index>
    );
  }
}
