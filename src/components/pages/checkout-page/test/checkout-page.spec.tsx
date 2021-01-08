import { newSpecPage } from '@stencil/core/testing';
import { CheckoutPage } from '../checkout-page';

describe('checkout-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CheckoutPage],
      html: `<checkout-page></checkout-page>`,
    });
    expect(page.root).toEqualHtml(`
      <checkout-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </checkout-page>
    `);
  });
});
