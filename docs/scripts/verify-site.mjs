import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const files = [path.join(root, 'index.html'), ...(await readdir(path.join(root, 'chapters'))).map(name => path.join(root, 'chapters', name))];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  if (new RegExp(`w${'is'}`, 'i').test(html)) throw new Error(`${file} contains a prohibited legacy name.`);
  for (const href of html.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|#)/.test(href[1])) continue;
    const target = path.resolve(path.dirname(file), href[1].split('#')[0]);
    try { await readFile(target); } catch { throw new Error(`${file} links to missing ${href[1]}`); }
  }
}
console.log(`Verified ${files.length} generated pages.`);
