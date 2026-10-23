import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';

const display = Space_Grotesk({ subsets: ['latin'], weight: 'variable', variable: '--ff-display' });
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: 'variable', variable: '--ff-sans' });
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--ff-mono',
});

/**
 * Classes that set --ff-display, --ff-sans and --ff-mono. They must go on <html>: the --t-*
 * text styles in tokens.css resolve the font variables on the root element.
 */
export const fontVariables = [display.variable, sans.variable, mono.variable];
