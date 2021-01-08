import { newE2EPage } from '@stencil/core/testing';

describe('cart-sidebar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cart-sidebar></cart-sidebar>');

    const element = await page.find('cart-sidebar');
    expect(element).toHaveClass('hydrated');
  });
});
