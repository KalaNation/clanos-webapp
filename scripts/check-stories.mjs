#!/usr/bin/env node
// Fails when a component has no sibling <name>.stories.tsx or <name>.test.tsx. Components are
// the .tsx files in src/components/** and src/features/*/components/**. Args: files or dirs.
import { existsSync, readdirSync, statSync } from 'node:fs';
import { basename, join, relative, sep } from 'node:path';

const COMPONENT_DIRS = [/^src\/components\//, /^src\/features\/[^/]+\/components\//];
const COMPANION_FILE = /\.(stories|test)\.tsx$/;
const COMPANIONS = ['stories', 'test'];

function* files(path) {
  const stat = statSync(path, { throwIfNoEntry: false });
  if (!stat) return;
  if (stat.isFile()) {
    yield path;
    return;
  }
  for (const name of readdirSync(path)) {
    if (name !== 'node_modules') yield* files(join(path, name));
  }
}

const toPosix = (path) => relative(process.cwd(), path).split(sep).join('/');
const isComponent = (path) =>
  path.endsWith('.tsx') && !COMPANION_FILE.test(path) && COMPONENT_DIRS.some((re) => re.test(path));

let problems = 0;
const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['src'];
for (const root of roots) {
  for (const file of files(root)) {
    const path = toPosix(file);
    if (!isComponent(path)) continue;
    const base = path.slice(0, -'.tsx'.length);
    for (const companion of COMPANIONS) {
      if (existsSync(`${base}.${companion}.tsx`)) continue;
      problems++;
      console.log(`${path}  missing ${basename(base)}.${companion}.tsx`);
    }
  }
}
if (problems) {
  console.log(
    `\n${problems} missing file(s). Every component needs a story and a test (AGENTS.md section 5).`,
  );
  process.exit(1);
}
console.log('check:stories: every component has a story and a test.');
