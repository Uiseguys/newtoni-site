import { Component, h } from '@stencil/core';

@Component({
  tag: 'layout-header',
  styleUrl: 'layout-header.scss',
  shadow: true,
})
export class LayoutHeader {
  render() {
    return (
      <header>
        <stencil-route-link url="/" exact={true}>
          <img src="/assets/svg/newtoni.svg" />
        </stencil-route-link>
      </header>
    );
  }
}
