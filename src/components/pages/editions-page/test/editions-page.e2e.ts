import { newE2EPage } from '@stencil/core/testing';

describe('editions-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<editions-page></editions-page>');

    const element = await page.find('editions-page');
    expect(element).toHaveClass('hydrated');
  });
});
