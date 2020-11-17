import { newSpecPage } from '@stencil/core/testing';
import { NewsPage } from '../news-page';

describe('news-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NewsPage],
      html: `<news-page></news-page>`,
    });
    expect(page.root).toEqualHtml(`
      <news-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </news-page>
    `);
  });
});
