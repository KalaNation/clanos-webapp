import * as z from 'zod';

/** Variables the browser may see. Next inlines NEXT_PUBLIC_* at build time: read each by name. */
const publicEnvSchema = z.object({
  // Not z.httpUrl(): it rejects hosts without a dot, such as localhost.
  NEXT_PUBLIC_API_URL: z.url({ protocol: /^https?$/ }),
});

/** Server-only variables. Read them through `@/env.server`, never from client code. */
export const serverEnvSchema = z.object({
  SESSION_COOKIE_NAME: z
    .string()
    .regex(/^[\w-]+$/, 'Use letters, digits, "_" or "-"')
    .default('clanos_session'),
});

/** Validates a set of variables and stops the app with a readable list of what's wrong. */
export function parseEnv<Schema extends z.ZodType>(
  schema: Schema,
  values: Record<string, string | undefined>,
  scope: string,
): z.output<Schema> {
  const result = schema.safeParse(values);
  if (!result.success) {
    throw new Error(`Invalid ${scope} environment variables:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const env = parseEnv(
  publicEnvSchema,
  { NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL },
  'public',
);
