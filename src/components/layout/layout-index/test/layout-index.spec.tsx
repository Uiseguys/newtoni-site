import { newSpecPage } from '@stencil/core/testing';
import { LayoutIndex } from '../layout-index';

describe('layout-index', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LayoutIndex],
      html: `<layout-index></layout-index>`,
    });
    expect(page.root).toEqualHtml(`
      <layout-index>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </layout-index>
    `);
  });
});
