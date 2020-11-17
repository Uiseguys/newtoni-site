import './index-660b38e0.js';
import { A as ActiveRouter } from './active-router-251d9f34.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
