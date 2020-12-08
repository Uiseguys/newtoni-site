import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  plugins: [sass()],
  bundles: [{ components: ['app-root', 'c-image', 'layout-index', 'layout-header', 'layout-footer', 'landing-page', 'posts-landing', 'posts-page'] }],
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],
  rollupPlugins: {
    after: [nodePolyfills()],
  },
};
