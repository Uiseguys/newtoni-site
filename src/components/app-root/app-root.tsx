import { Component, Host, h } from '@stencil/core';
import newsArr from '../../data/news';
import editionsArr from '../../data/editions';
import publicationsArr from '../../data/publications.js';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  render() {
    return (
      <Host>
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
              <stencil-route url="/editions" component="posts-landing" componentProps={{ heading: 'Latest Editions', posts: editionsArr }} exact={true} />
              <stencil-route url="/publications" component="posts-landing" componentProps={{ heading: 'Latest Publications', posts: publicationsArr }} exact={true} />
              {newsArr.map(post => (
                <stencil-route url={post.slug} componentProps={{ post: post }} component="posts-page" exact={true} />
              ))}
              {editionsArr.map(post => (
                <stencil-route url={post.slug} componentProps={{ post: post }} component="posts-page" exact={true} />
              ))}
              {publicationsArr.map(post => {
                console.log(post);
                return <stencil-route url={post.slug} componentProps={{ post: post }} component="posts-page" exact={true} />;
              })}
            </stencil-route-switch>
          </stencil-router>
        </main>
        <layout-footer />
      </Host>
    );
  }
}
