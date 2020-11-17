import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'news-page',
  styleUrl: 'news-page.scss',
  shadow: true,
})
export class NewsPage {
  render() {
    return (
      <Host>
        <h1>This is the News Page</h1>
        <slot></slot>
      </Host>
    );
  }
}
