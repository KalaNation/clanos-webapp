/** Keyboard focus ring for buttons, tabs and other controls (`overlay/focus-ring`). */
export const focusRing = 'outline-none focus-visible:ring-3 focus-visible:ring-focus';

/** Focus, invalid and valid states shared by inputs, textareas and select triggers (M45). */
export const fieldStates =
  'outline-none transition-colors focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-focus aria-invalid:border-bad data-[valid=true]:border-ok';

/** Grows the hit area to the 44px touch target without changing how the control looks. */
export const touchTarget =
  'relative after:absolute after:top-1/2 after:left-1/2 after:size-full after:min-h-touch after:min-w-touch after:-translate-1/2';
