#!/usr/bin/env node
// Check every row of references/evidence.md against Crossref: the DOI resolves, and its authors (all of them,
// in order), year and title match the row. Needs network access, so it is not part of `npm test` or CI.
// Run with `npm run check-dois`. Exits 1 when a row with a DOI does not match.

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const text = readFileSync(join(ROOT, 'references/evidence.md'), 'utf8');

const fold = (s) => String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/<[^>]+>/g, ' ').replace(/[′’‘`']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const words = (s) => new Set(fold(s).split(' ').filter((w) => w.length > 2));
const overlap = (a, b) => {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / Math.min(A.size, B.size);
};

const rows = [];
for (const line of text.split('\n')) {
  const m = line.match(/^\| (E\d{2}) \| (.*?) \| /);
  if (!m) continue;
  const ref = m[2];
  const head = ref.match(/^(.*?) \((\d{4})(?:, online (\d{4}))?\)\. (.*?)\. \*/);
  rows.push({
    id: m[1],
    authors: head ? head[1].split(',').map((a) => a.trim().replace(/ [A-Z]{1,4}$/, '')) : [],
    years: head ? [head[2], head[3]].filter(Boolean) : [],
    title: head ? head[4] : null,
    doi: (line.match(/\(https:\/\/doi\.org\/([^)\s]+)\)/) || [])[1] || null,
  });
}

async function crossref(doi) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
        headers: { 'User-Agent': 'cycling-coach-skill check-dois (https://github.com/amstrad/cycling-coach-skill)' },
      });
      if (res.status === 404) return { missing: true };
      if (res.ok) return (await res.json()).message;
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
  }
  return { unreachable: true };
}

const out = [];
let bad = 0;
for (const r of rows) {
  if (!r.doi) { out.push({ id: r.id, result: 'no DOI', detail: 'checked by hand; see the row link' }); continue; }
  if (!r.title) { out.push({ id: r.id, result: 'UNPARSED', detail: 'reference does not follow "Authors (year). Title. *Journal*"' }); bad++; continue; }
  const c = await crossref(r.doi);
  if (c.unreachable) { out.push({ id: r.id, result: 'UNREACHABLE', detail: r.doi }); continue; }
  if (c.missing) { out.push({ id: r.id, result: 'MISMATCH', detail: `DOI ${r.doi} is not registered at Crossref` }); bad++; continue; }
  const cAuthors = (c.author || []).map((a) => a.family || a.name || '');
  const cAuthor = cAuthors[0] || '';
  const cYears = ['published-print', 'published-online', 'published', 'issued', 'created']
    .map((k) => c[k]?.['date-parts']?.[0]?.[0]).filter(Boolean).map(String);
  const cTitle = [c.title?.[0], c.subtitle?.[0]].filter(Boolean).join(': ');
  const problems = [];
  if (r.authors.length !== cAuthors.length || r.authors.some((a, i) => fold(a) !== fold(cAuthors[i]))) {
    problems.push(`authors [${r.authors.join('; ')}] vs Crossref [${cAuthors.join('; ')}]`);
  }
  if (!r.years.some((y) => cYears.includes(y))) problems.push(`year ${r.years.join('/')} vs Crossref ${[...new Set(cYears)].join('/')}`);
  const sim = overlap(r.title, cTitle);
  if (sim < 0.85) problems.push(`title overlap ${sim.toFixed(2)}: Crossref "${cTitle}"`);
  if (fold(c.DOI) !== fold(r.doi)) problems.push(`DOI ${r.doi} vs Crossref ${c.DOI}`);
  if (problems.length) { bad++; out.push({ id: r.id, result: 'MISMATCH', detail: problems.join('; ') }); }
  else out.push({ id: r.id, result: 'ok', detail: `${cAuthor}${cAuthors.length > 1 ? ` +${cAuthors.length - 1}` : ''} ${[...new Set(cYears)].sort()[0]} · ${(c['container-title']?.[0] || '').replace(/&amp;/g, '&')}` });
  await new Promise((res) => setTimeout(res, 150));
}

console.log('| Row | Result | Detail |');
console.log('|---|---|---|');
for (const o of out) console.log(`| ${o.id} | ${o.result} | ${o.detail} |`);
console.log(`\n${rows.length} rows: ${out.filter((o) => o.result === 'ok').length} ok, ${bad} mismatch, ${out.filter((o) => o.result === 'no DOI').length} without DOI, ${out.filter((o) => o.result === 'UNREACHABLE').length} unreachable`);
process.exit(bad ? 1 : 0);
