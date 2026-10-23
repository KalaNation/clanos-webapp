import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge, BADGES, type BadgeVariant } from './badge';

describe('Badge', () => {
  it('shows the design label with a glyph that screen readers skip', () => {
    render(<Badge variant="suspended" />);

    expect(screen.getByText('Suspended')).toBeInTheDocument();
    expect(screen.getByText('▲')).toHaveAttribute('aria-hidden', 'true');
  });

  it.each<BadgeVariant>([
    'active',
    'pending',
    'suspended',
    'removed',
    'accepted',
    'declined',
    'expired',
    'revoked',
    'unverified',
    'locked',
  ])('gives the %s status a glyph, so status never relies on colour alone', (status) => {
    expect(BADGES[status]).toHaveProperty('glyph');
  });

  it('accepts a custom label', () => {
    render(<Badge variant="active">Act</Badge>);

    expect(screen.getByText('Act')).toBeInTheDocument();
    expect(screen.queryByText('Active')).not.toBeInTheDocument();
  });

  it('renders announcement badges without a glyph', () => {
    const { container } = render(<Badge variant="draft" />);

    expect(container).toHaveTextContent(/^Draft$/);
  });
});
