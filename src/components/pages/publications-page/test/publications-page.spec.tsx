import { newSpecPage } from '@stencil/core/testing';
import { PublicationsPage } from '../publications-page';

describe('publications-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PublicationsPage],
      html: `<publications-page></publications-page>`,
    });
    expect(page.root).toEqualHtml(`
      <publications-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </publications-page>
    `);
  });
});
