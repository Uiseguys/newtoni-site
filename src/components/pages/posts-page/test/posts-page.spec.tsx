import { newSpecPage } from '@stencil/core/testing';
import { PostsPage } from '../posts-page';

describe('posts-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostsPage],
      html: `<posts-page></posts-page>`,
    });
    expect(page.root).toEqualHtml(`
      <posts-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </posts-page>
    `);
  });
});
