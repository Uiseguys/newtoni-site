import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'publications-page',
  styleUrl: 'publications-page.scss',
  shadow: true,
})
export class PublicationsPage {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
