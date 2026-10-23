import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

export interface CheckResult {
  passed: boolean;
  output: string;
}

/** Runs a check script against one fixture file written to a fresh temp folder. */
export function runCheck(script: string, fileName: string, source: string): CheckResult {
  const file = join(mkdtempSync(join(tmpdir(), 'clanos-check-')), fileName);
  writeFileSync(file, source);
  return run(script, [file]);
}

/** Writes a small project tree to a temp folder and runs a check script from its root. */
export function runCheckInProject(
  script: string,
  tree: Record<string, string>,
  args: string[] = [],
): CheckResult {
  const root = mkdtempSync(join(tmpdir(), 'clanos-project-'));
  for (const [path, source] of Object.entries(tree)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), source);
  }
  return run(script, args, root);
}

function run(script: string, args: string[], cwd?: string): CheckResult {
  const result = spawnSync(process.execPath, [join(import.meta.dirname, script), ...args], {
    cwd,
    encoding: 'utf8',
  });
  return { passed: result.status === 0, output: result.stdout };
}
