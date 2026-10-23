#!/usr/bin/env node
// Fails on comments longer than 3 lines (JSDoc directly above an export is exempt) and on TODOs
// without an issue number. usage: node scripts/check-comments.mjs [file|dir ...] (default: .)
// AGENTS.md also allows TODO(token) for a missing design token; see section 1.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

import ts from 'typescript';

const MAX_LINES = 3;
const SCRIPT_KINDS = {
  '.ts': ts.ScriptKind.TS,
  '.mts': ts.ScriptKind.TS,
  '.cts': ts.ScriptKind.TS,
  '.tsx': ts.ScriptKind.TSX,
  '.js': ts.ScriptKind.JS,
  '.mjs': ts.ScriptKind.JS,
  '.cjs': ts.ScriptKind.JS,
  '.jsx': ts.ScriptKind.JSX,
};
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'out',
  'build',
  'coverage',
  'public',
  'design',
  'storybook-static',
  'playwright-report',
  'test-results',
]);
const SKIP_FILES = /(^|[\\/])(tokens\.css|next-env\.d\.ts)$/;
const TODO_WITHOUT_ISSUE = /\bTODO\b(?!\((#\d+|token)\))/;
const LITERAL_KINDS = new Set([
  ts.SyntaxKind.JsxText,
  ts.SyntaxKind.JsxTextAllWhiteSpaces,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.RegularExpressionLiteral,
]);

function* files(path) {
  const stat = statSync(path, { throwIfNoEntry: false });
  if (!stat) return;
  if (stat.isFile()) {
    const ext = extname(path);
    if ((ext in SCRIPT_KINDS || ext === '.css') && !SKIP_FILES.test(path)) yield path;
    return;
  }
  for (const name of readdirSync(path)) {
    if (!SKIP_DIRS.has(name)) yield* files(join(path, name));
  }
}

function scriptComments(file, text) {
  const source = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    SCRIPT_KINDS[extname(file)],
  );
  const ranges = new Map();
  const literals = [];
  const visit = (node) => {
    if (LITERAL_KINDS.has(node.kind)) literals.push([node.getStart(source), node.end]);
    for (const range of ts.getLeadingCommentRanges(text, node.getFullStart()) ?? [])
      ranges.set(range.pos, range);
    for (const range of ts.getTrailingCommentRanges(text, node.end) ?? [])
      ranges.set(range.pos, range);
    node.getChildren(source).forEach(visit);
  };
  visit(source);
  // The scanner reports "comments" inside JSX text and string literals; drop those.
  return [...ranges.values()]
    .filter(({ pos }) => !literals.some(([start, end]) => pos >= start && pos < end))
    .map(({ pos, end, kind }) => ({
      pos,
      end,
      block: kind === ts.SyntaxKind.MultiLineCommentTrivia,
    }));
}

function cssComments(text) {
  return [...text.matchAll(/\/\*[\s\S]*?\*\//g)].map((m) => ({
    pos: m.index,
    end: m.index + m[0].length,
    block: true,
  }));
}

// Consecutive // lines form one comment; delimiter-only lines (/**, */) don't count.
function groupComments(text, comments) {
  const groups = [];
  for (const comment of comments.sort((a, b) => a.pos - b.pos)) {
    const last = groups.at(-1);
    const joinsLast =
      last &&
      !comment.block &&
      !last.block &&
      /^[ \t]*\r?\n[ \t]*$/.test(text.slice(last.end, comment.pos));
    if (joinsLast) {
      last.end = comment.end;
      last.lines++;
      continue;
    }
    const body = text.slice(comment.pos, comment.end);
    const lines = comment.block
      ? body.split('\n').filter((line) => !/^\s*(\/\*\*?|\*\/)\s*$/.test(line)).length
      : 1;
    groups.push({ ...comment, lines, jsdoc: body.startsWith('/**') });
  }
  return groups;
}

let problems = 0;
const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['.'];
for (const root of roots) {
  for (const file of files(root)) {
    const text = readFileSync(file, 'utf8');
    const comments = extname(file) === '.css' ? cssComments(text) : scriptComments(file, text);
    const lineOf = (pos) => text.slice(0, pos).split('\n').length;
    const where = (pos) => `${relative(process.cwd(), file)}:${lineOf(pos)}`;
    for (const group of groupComments(text, comments)) {
      const aboveExport = group.jsdoc && /^\s*export\b/.test(text.slice(group.end));
      if (group.lines > MAX_LINES && !aboveExport) {
        problems++;
        console.log(
          `${where(group.pos)}  comment is ${group.lines} lines (max ${MAX_LINES}): move the reasoning to the PR or an ADR`,
        );
      }
      const body = text.slice(group.pos, group.end);
      for (const todo of body.matchAll(new RegExp(TODO_WITHOUT_ISSUE.source, 'g'))) {
        problems++;
        console.log(
          `${where(group.pos + todo.index)}  TODO without an issue number: write TODO(#123)`,
        );
      }
    }
  }
}
if (problems) {
  console.log(`\n${problems} comment problem(s) found. See AGENTS.md section 6.`);
  process.exit(1);
}
console.log('check:comments: all comments are short and every TODO has an issue.');
