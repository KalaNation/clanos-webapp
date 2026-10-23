import 'server-only';

import { parseEnv, serverEnvSchema } from './env';

export const serverEnv = parseEnv(
  serverEnvSchema,
  { SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME },
  'server',
);
