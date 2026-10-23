import { CircleXIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Error with a retry (D45 data states). Never shows the error itself: users get a plain message
 * and the details stay in the logs.
 */
export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col gap-sp-16">
      <CircleXIcon aria-hidden="true" className="size-sp-32 text-bad" />
      <h1 className="t-h1">Something went wrong</h1>
      <p className="t-body text-tx-2">
        We couldn’t load this page. Try again, and if it keeps happening, let your clan staff know.
      </p>
      <Button size="lg" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
