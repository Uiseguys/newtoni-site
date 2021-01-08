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
  @State() items: any;
  @State() showCart: boolean = false;

  componentWillRender = () => {
    const localItems = localStorage.getItem('newtoni-items');
    if (localItems) {
      this.items = JSON.parse(localItems);
    }
  };

  addItem = obj => {
    this.items.push(obj);
    localStorage.setItem('newtoni-items', JSON.stringify(this.items));
  };

  removeItem = obj => {
    this.items = this.items.reduce((acc, val, index) => {
      if (obj.id === val.id) acc.push(val);
      return acc;
    }, []);
    localStorage.setItem('newtoni-items', JSON.stringify(this.items));
  };

  changeQuantity = (id, qty) => {
    this.items = this.items.map(val => {
      return val;
    }, []);
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
              {newsArr.map(post => (
                <stencil-route url={post.slug} componentProps={{ post: post, addItem: () => this.addItem(post) }} component="posts-page" exact={true} />
              ))}
              {editionsArr.map(post => (
                <stencil-route url={post.slug} componentProps={{ post: post, addItem: () => this.addItem(post) }} component="posts-page" exact={true} />
              ))}
              {publicationsArr.map(post => {
                return <stencil-route url={post.slug} componentProps={{ post: post, addItem: () => this.addItem(post) }} component="posts-page" exact={true} />;
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
