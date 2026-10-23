import '../src/app/globals.css';

import type { Preview } from '@storybook/nextjs-vite';
import { themes } from 'storybook/theming';

import { TooltipProvider } from '../src/components/ui/tooltip';
import { fontVariables } from '../src/lib/fonts';

// Same as the root layout: the font classes belong on <html>, not on a wrapper.
document.documentElement.classList.add(...fontVariables);

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    docs: { theme: themes.dark },
    // Any axe violation fails the story's test in CI.
    a11y: { test: 'error' },
    viewport: {
      options: {
        mobile: { name: 'Mobile · M frames', styles: { width: '390px', height: '844px' } },
        desktop: { name: 'Desktop · D frames', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
};

export default preview;
