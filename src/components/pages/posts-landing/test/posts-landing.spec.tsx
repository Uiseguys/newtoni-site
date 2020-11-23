import { newSpecPage } from '@stencil/core/testing';
import { PostsLanding } from '../posts-landing';

describe('posts-landing', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostsLanding],
      html: `<posts-landing></posts-landing>`,
    });
    expect(page.root).toEqualHtml(`
      <posts-landing>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </posts-landing>
    `);
  });
});
