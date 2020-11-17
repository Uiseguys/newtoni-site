import { newSpecPage } from '@stencil/core/testing';
import { EditionsPage } from '../editions-page';

describe('editions-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditionsPage],
      html: `<editions-page></editions-page>`,
    });
    expect(page.root).toEqualHtml(`
      <editions-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </editions-page>
    `);
  });
});
