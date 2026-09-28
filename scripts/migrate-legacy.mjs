import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const legacy = path.join(root, 'source', 'WUT1_three_architectures_teaching_guide_zh-TW.md');
const archive = path.join(root, 'archive', 'WUT1_three_architectures_teaching_guide_zh-TW.md');
const contentDir = path.join(root, 'content');
const groups = [
  ['getting-started', '開始這套教學', 'course'],
  ['shared-foundations', '共同基礎', 'course'],
  ['it-backend', 'IT Backend', 'course'],
  ['vue', 'Vue 路線', 'course'],
  ['react', 'React 路線', 'course'],
  ['citizen-and-comparison', 'Citizen 與架構比較', 'course'],
  ['reference', '參考資料', 'reference']
];
const pages = [
  ['00-overview', '導讀：這份教學要解決什麼問題', 0],
  ['01-teaching-site-design', '教學網站設計', 0],
  ['02-three-architectures', '三種架構總覽', 0],
  ['03-shared-web-foundations', '共同 Web 基礎', 1],
  ['04-it-backend', 'IT 共用 Backend：Java 與 Spring Boot', 2],
  ['05-vue-path', 'IT Vue 路線', 3],
  ['06-react-path', 'IT React 路線', 4],
  ['07-citizen-python-path', 'Citizen Python 路線', 5],
  ['08-scripts-and-build', 'Scripts 與 Build Tooling', 1],
  ['09-configuration', '設定檔語法', 1],
  ['10-feature-comparison', '同一功能的三種寫法比較', 5],
  ['11-syntax-index', 'Syntax Index', 6],
  ['12-learning-paths', '建議學習路徑', 0],
  ['13-site-operations', '教學網站運作與維護', 6],
  ['14-guided-labs', '每個範例的實作 Lab', 6],
  ['15-human-review', 'Human Review Checklist', 1],
  ['16-readiness-check', '驗證與閱讀檢查', 1],
  ['17-responsibility-boundaries', '三個專案的技術責任邊界', 5],
  ['18-learning-outcomes', '最後應該教會什麼', 5],
  ['appendix-a-version-baseline', '版本基線', 6],
  ['appendix-b-web-typescript-api', 'Web 與 TypeScript API 補充', 6],
  ['appendix-c-css-reference', 'CSS 語法補充', 6],
  ['appendix-d-file-mapping', '專案檔案與教學章節對照', 6],
  ['appendix-e-out-of-scope', '目前未使用的技術', 6]
];

const source = await readFile(legacy, 'utf8');
const markers = [...source.matchAll(/^# (Part [^\n]+|Appendix [^\n]+)/gm)];
const chunks = [source.slice(0, markers[0].index), ...markers.map((match, index) => source.slice(match.index, markers[index + 1]?.index))];
if (chunks.length !== pages.length) throw new Error(`Expected ${pages.length} sections, found ${chunks.length}.`);

await mkdir(contentDir, { recursive: true });
for (const [index, [slug, title, groupIndex]] of pages.entries()) {
  const [, group, kind] = groups[groupIndex];
  const body = chunks[index].replace(/^# [^\n]+\n+/, '');
  const document = `---\ntitle: ${title}\ngroup: ${groups[groupIndex][0]}\nkind: ${kind}\n---\n\n# ${title}\n\n${body.trim()}\n`;
  await writeFile(path.join(contentDir, `${slug}.md`), document, 'utf8');
}

const navigation = {
  groups: groups.map(([id, title]) => ({ id, title })),
  pages: pages.map(([slug, title, groupIndex]) => ({ slug, title, group: groups[groupIndex][0] }))
};
await writeFile(path.join(root, 'navigation.json'), `${JSON.stringify(navigation, null, 2)}\n`, 'utf8');
await mkdir(path.dirname(archive), { recursive: true });
if (!existsSync(archive)) await rename(legacy, archive);
console.log(`Created ${pages.length} content pages and archived the legacy source.`);
