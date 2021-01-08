import { newSpecPage } from '@stencil/core/testing';
import { CartSidebar } from '../cart-sidebar';

describe('cart-sidebar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CartSidebar],
      html: `<cart-sidebar></cart-sidebar>`,
    });
    expect(page.root).toEqualHtml(`
      <cart-sidebar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cart-sidebar>
    `);
  });
});
