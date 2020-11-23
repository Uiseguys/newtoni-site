import { newE2EPage } from '@stencil/core/testing';

describe('posts-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<posts-page></posts-page>');

    const element = await page.find('posts-page');
    expect(element).toHaveClass('hydrated');
  });
});
