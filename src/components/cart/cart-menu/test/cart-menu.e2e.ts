import { newE2EPage } from '@stencil/core/testing';

describe('cart-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cart-menu></cart-menu>');

    const element = await page.find('cart-menu');
    expect(element).toHaveClass('hydrated');
  });
});
