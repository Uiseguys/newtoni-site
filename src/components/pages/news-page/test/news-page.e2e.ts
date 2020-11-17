import { newE2EPage } from '@stencil/core/testing';

describe('news-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<news-page></news-page>');

    const element = await page.find('news-page');
    expect(element).toHaveClass('hydrated');
  });
});
