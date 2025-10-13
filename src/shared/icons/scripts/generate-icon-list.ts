import { readdirSync, writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ICON_DIR = join(__dirname, '../source');
const NAMES_OUT = join(__dirname, '../iconNames.ts');
const INDEX_OUT = join(__dirname, '../index.ts');

const files = readdirSync(ICON_DIR, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.svg'))
  .map((d) => d.name);

const iconNames = files.map((file) => basename(file, '.svg')).sort();
const namesContent = `// 이 파일은 자동 생성 파일입니다. (직접 수정 금지)
export const iconNames = ${JSON.stringify(iconNames, null, 2)} as const;
export type IconName = typeof iconNames[number];
`;
writeFileSync(NAMES_OUT, namesContent, 'utf8');

const importLines = files
  .map((file) => `import './source/${file}';`)
  .join('\n');

const indexContent = `// AUTO-GENERATED (직접 수정 금지)
// 브라우저에서만 스프라이트 런타임 로드(SSR 안전)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('svg-sprite-loader/runtime/browser-sprite.build');
}

${importLines}

export { Icon } from './components/icon';
`;
writeFileSync(INDEX_OUT, indexContent, 'utf8');
