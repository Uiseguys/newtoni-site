import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <layout-header />
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="landing-page" exact={true}></stencil-route>
              <stencil-route url="/news" component="news-page" exact={true}></stencil-route>
            </stencil-route-switch>
          </stencil-router>
        </main>
        <layout-footer />
      </Host>
    );
  }
}
