import { Component, h } from '@stencil/core';

@Component({
  tag: 'layout-footer',
  styleUrl: 'layout-footer.scss',
})
export class LayoutFooter {
  render() {
    return (
      <footer>
        <img src="/assets/svg/newtoni.svg" />© copyright {new Date().getFullYear()} New toni Press
      </footer>
    );
  }
}
