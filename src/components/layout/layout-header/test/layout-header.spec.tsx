import { newSpecPage } from '@stencil/core/testing';
import { LayoutHeader } from '../layout-header';

describe('layout-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LayoutHeader],
      html: `<layout-header></layout-header>`,
    });
    expect(page.root).toEqualHtml(`
      <layout-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </layout-header>
    `);
  });
});
