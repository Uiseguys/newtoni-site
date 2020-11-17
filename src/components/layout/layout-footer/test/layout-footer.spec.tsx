import { newSpecPage } from '@stencil/core/testing';
import { LayoutFooter } from '../layout-footer';

describe('layout-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LayoutFooter],
      html: `<layout-footer></layout-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <layout-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </layout-footer>
    `);
  });
});
