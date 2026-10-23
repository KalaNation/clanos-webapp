import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useDrawerStore } from './drawer-store';

describe('useDrawerStore', () => {
  beforeEach(() => {
    useDrawerStore.setState({ isOpen: false });
  });

  it('starts closed, then opens and closes', () => {
    expect(useDrawerStore.getState().isOpen).toBe(false);

    act(() => {
      useDrawerStore.getState().open();
    });
    expect(useDrawerStore.getState().isOpen).toBe(true);

    act(() => {
      useDrawerStore.getState().close();
    });
    expect(useDrawerStore.getState().isOpen).toBe(false);
  });

  it('follows the sheet’s own open state, e.g. after Escape', () => {
    act(() => {
      useDrawerStore.getState().setOpen(true);
    });
    act(() => {
      useDrawerStore.getState().setOpen(false);
    });

    expect(useDrawerStore.getState().isOpen).toBe(false);
  });
});
