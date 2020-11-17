import { newE2EPage } from '@stencil/core/testing';

describe('layout-index', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<layout-index></layout-index>');

    const element = await page.find('layout-index');
    expect(element).toHaveClass('hydrated');
  });
});
