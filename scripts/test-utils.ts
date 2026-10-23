import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export interface CheckResult {
  passed: boolean;
  output: string;
}

/** Runs a check script against one fixture file written to a fresh temp folder. */
export function runCheck(script: string, fileName: string, source: string): CheckResult {
  const file = join(mkdtempSync(join(tmpdir(), 'clanos-check-')), fileName);
  writeFileSync(file, source);
  const result = spawnSync(process.execPath, [join(import.meta.dirname, script), file], {
    encoding: 'utf8',
  });
  return { passed: result.status === 0, output: result.stdout };
}
