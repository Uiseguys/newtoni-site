import { Component, State, h } from '@stencil/core';
import Tunnel from '../cart/cart-data/active';

// Page Data
import newsArr from '../../data/news';
import editionsArr from '../../data/editions';
import publicationsArr from '../../data/publications.js';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  @State() items: Array<object | null | any>;
  @State() showCart: boolean = false;

  componentWillLoad = () => {
    const localItems = localStorage.getItem('newtoni-items');
    if (localItems) {
      this.items = JSON.parse(localItems);
    } else {
      this.items = [];
    }
  };

  addItem = obj => {
    let isAlreadyAdded = false;
    if (this.items.length > 0) {
      this.items.forEach(item => {
        if (item.slug == obj.slug) {
          isAlreadyAdded = true;
        }
      });
    }
    if (!isAlreadyAdded) {
      this.items = [...this.items, obj];
      localStorage.setItem('newtoni-items', JSON.stringify(this.items));
    }
  };

  removeItem = obj => {
    this.items = this.items.reduce((acc, item) => {
      if (item.slug != obj.slug) acc.push(item);
      return acc;
    }, []);
    localStorage.setItem('newtoni-items', JSON.stringify(this.items));
  };

  changeQuantity = obj => {
    this.items = this.items.map(item => {
      if (item.slug == obj.slug) return obj;
      return item;
    });
    localStorage.setItem('newtoni-items', JSON.stringify(this.items));
  };

  handleCartMenuClick = () => {
    if (this.showCart) {
      this.showCart = false;
    } else {
      this.showCart = true;
    }
  };

  render() {
    const state = {
      items: this.items,
      removeItem: this.removeItem,
      addItem: this.addItem,
      changeQuantity: this.changeQuantity,
      showCart: this.showCart,
      handleCartMenuClick: this.handleCartMenuClick,
    };

    return (
      <Tunnel.Provider state={state}>
        <cart-sidebar />
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route
                url="/"
                component="landing-page"
                componentProps={{
                  latestNews: newsArr.slice(0, 3),
                  latestEditions: editionsArr.slice(0, 3),
                  latestPublications: publicationsArr.slice(0, 3),
                }}
                exact={true}
              />
              <stencil-route url="/news" component="posts-landing" componentProps={{ heading: 'Latest News', posts: newsArr }} exact={true} />
              <stencil-route url="/editions" component="posts-landing" componentProps={{ type: 'editions', heading: 'Latest Editions', posts: editionsArr }} exact={true} />
              <stencil-route
                url="/publications"
                component="posts-landing"
                componentProps={{ type: 'publications', heading: 'Latest Publications', posts: publicationsArr }}
                exact={true}
              />
              <stencil-route url="/checkout" component="checkout-page" exact={true} />
              {newsArr.map(post => (
                <stencil-route url={post.slug} componentProps={{ post: post }} component="posts-page" exact={true} />
              ))}
              {editionsArr.map(post => (
                <stencil-route url={post.slug} componentProps={{ post: post }} component="posts-page" exact={true} />
              ))}
              {publicationsArr.map(post => {
                return <stencil-route url={post.slug} componentProps={{ post: post }} component="posts-page" exact={true} />;
              })}
            </stencil-route-switch>
          </stencil-router>
        </main>
        <layout-footer />
        <slot />
      </Tunnel.Provider>
    );
  }
}
