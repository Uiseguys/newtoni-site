import { newSpecPage } from '@stencil/core/testing';
import { CartMenu } from '../cart-menu';

describe('cart-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CartMenu],
      html: `<cart-menu></cart-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <cart-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cart-menu>
    `);
  });
});
