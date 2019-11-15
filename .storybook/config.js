import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';
import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());
addDecorator(
  withTests({
    results,
  })
);

addParameters({
  options: {
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    enableShortcuts: true,
    isToolshown: true,
    theme: undefined,
    storySort: undefined,
  },
});

addDecorator(withKnobs, {
  knobs: {
    timestamps: true,
    escapeHTML: true,
  },
});

const req = require.context('../src/app/', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
