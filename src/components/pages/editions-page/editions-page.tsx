import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'editions-page',
  styleUrl: 'editions-page.scss',
  shadow: true,
})
export class EditionsPage {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
