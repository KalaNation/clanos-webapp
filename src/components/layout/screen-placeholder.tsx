import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

interface ScreenPlaceholderProps {
  title: string;
  /** Design frames for this route, e.g. ['D18', 'M18', 'M19']. */
  screens: string[];
}

/** Stands in for a screen that isn't built yet and points to its design previews. */
export function ScreenPlaceholder({ title, screens }: ScreenPlaceholderProps) {
  return (
    <section aria-labelledby="screen-title" className="flex flex-col gap-section">
      <header className="flex flex-col gap-sp-8">
        <p className="t-label text-mut">Not built yet</p>
        <h1 id="screen-title" className="t-h1">
          {title}
        </h1>
        <ul aria-label="Design frames" className="flex flex-wrap gap-sp-6">
          {screens.map((screen) => (
            <li
              key={screen}
              className="rounded-xs border border-bd bg-s2 px-sp-6 py-sp-4 t-data-strong text-brand"
            >
              {screen}
            </li>
          ))}
        </ul>
      </header>
      <Card variant="dashed">
        <CardContent>
          <CardTitle level={2}>Start from the design</CardTitle>
          <CardDescription>
            The previews for these frames are in _docs/design/previews (d## desktop, m## mobile),
            and HANDOFF.md lists their components, roles and open decisions.
          </CardDescription>
        </CardContent>
      </Card>
    </section>
  );
}
