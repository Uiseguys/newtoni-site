import { newE2EPage } from '@stencil/core/testing';

describe('publications-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<publications-page></publications-page>');

    const element = await page.find('publications-page');
    expect(element).toHaveClass('hydrated');
  });
});
