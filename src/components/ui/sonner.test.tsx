import { act, render, screen } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, expect, it } from 'vitest';

import { Toaster } from './sonner';

describe('Toaster', () => {
  it('shows a toast with its description', async () => {
    render(<Toaster />);

    act(() => {
      toast.success('Invitation sent', { description: 'Rvnt_Kaze will get an email.' });
    });

    expect(await screen.findByText('Invitation sent')).toBeInTheDocument();
    expect(screen.getByText('Rvnt_Kaze will get an email.')).toBeInTheDocument();
  });
});
