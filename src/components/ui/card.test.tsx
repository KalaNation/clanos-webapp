import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('gives its title a heading role so screen readers can jump between cards', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Needs your attention</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>3 applications are waiting.</CardDescription>
        </CardContent>
      </Card>,
    );

    expect(
      screen.getByRole('heading', { level: 3, name: 'Needs your attention' }),
    ).toBeInTheDocument();
    expect(screen.getByText('3 applications are waiting.')).toBeInTheDocument();
  });

  it('renders its title at the heading level the page needs', () => {
    render(<CardTitle level={2}>Buttons</CardTitle>);

    expect(screen.getByRole('heading', { level: 2, name: 'Buttons' })).toBeInTheDocument();
  });

  it('switches to the dashed empty-state border', () => {
    const { container } = render(<Card variant="dashed" />);

    expect(container.firstChild).toHaveClass('border-dashed');
  });
});
