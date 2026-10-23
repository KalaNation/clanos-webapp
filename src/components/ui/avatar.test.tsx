import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

describe('Avatar', () => {
  it('shows the fallback until an image has loaded', () => {
    render(
      <Avatar>
        <AvatarImage src="/does-not-load.png" alt="Rhen_Valkyr" />
        <AvatarFallback>RV</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText('RV')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Rhen_Valkyr' })).not.toBeInTheDocument();
  });

  it('uses the striped placeholder when there are no initials', () => {
    render(
      <Avatar>
        <AvatarFallback role="img" aria-label="Rhen_Valkyr" />
      </Avatar>,
    );

    expect(screen.getByRole('img', { name: 'Rhen_Valkyr' })).toHaveClass('bg-stripes-avatar');
  });
});
