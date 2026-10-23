import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('is hidden from assistive technology; the loading region announces itself', () => {
    const { container } = render(<Skeleton className="h-sp-10" />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
