import { newE2EPage } from '@stencil/core/testing';

describe('posts-landing', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<posts-landing></posts-landing>');

    const element = await page.find('posts-landing');
    expect(element).toHaveClass('hydrated');
  });
});
