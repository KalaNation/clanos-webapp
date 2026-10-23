'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import type * as React from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

// Sonner reads these variables; they point at tokens, so no raw colour reaches the page.
const TOAST_THEME = {
  '--normal-bg': 'var(--s1)',
  '--normal-text': 'var(--tx)',
  '--normal-border': 'var(--bd)',
  '--border-radius': 'var(--r-lg)',
} as React.CSSProperties;

/** Toast container. CLANOS is dark only, so the theme is fixed instead of read from the OS. */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-sp-16 text-ok" />,
        info: <InfoIcon className="size-sp-16 text-info" />,
        warning: <TriangleAlertIcon className="size-sp-16 text-warn" />,
        error: <OctagonXIcon className="size-sp-16 text-bad" />,
        loading: <Loader2Icon className="size-sp-16 animate-spin text-mut" />,
      }}
      style={TOAST_THEME}
      toastOptions={{
        classNames: {
          toast: 't-body shadow-none',
          title: 't-body-strong',
          description: 't-caption text-mut',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
