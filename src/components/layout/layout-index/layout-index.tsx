import { Component, Host, h, Prop } from '@stencil/core';
import Helmet from '@stencil/helmet';

@Component({
  tag: 'layout-index',
  styleUrl: 'layout-index.scss',
})
export class LayoutIndex {
  @Prop() pageTitle: string;
  @Prop() description: string;

  render() {
    return (
      <Host>
        <Helmet>
          <title>{`New Toni | ${this.pageTitle}`}</title>
          <meta name="description" content={this.description} />
        </Helmet>
        <slot />
      </Host>
    );
  }
}
