import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScreenPlaceholder } from './screen-placeholder';

describe('ScreenPlaceholder', () => {
  it('names the screen and the design frames to build it from', () => {
    render(<ScreenPlaceholder title="Clan directory" screens={['D18', 'M18', 'M19']} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Clan directory' })).toBeInTheDocument();
    const frames = screen.getByRole('list', { name: 'Design frames' });
    expect(frames).toHaveTextContent('D18');
    expect(frames).toHaveTextContent('M19');
  });
});
