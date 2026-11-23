// Usage (from /data): node Setuchat-Motion/remotion/render.mjs <still|video> [comp] [out] [frame]
// Bundles with a webpack override that sets esbuild tsconfigRaw (fixes "typescript.sys undefined" loader crash).
import {bundle} from '@remotion/bundler';
import {renderStill, renderMedia, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const [mode='still', comp='SetuChat', out='/tmp/still.png', frame='60'] = process.argv.slice(2);
const dir = path.dirname(new URL(import.meta.url).pathname);
const fix = (rules) => rules.map(r => {
  if (r && r.use) { const u = Array.isArray(r.use)?r.use:[r.use];
    u.forEach(x => { if (x && typeof x==='object' && String(x.loader).includes('esbuild')) x.options={...x.options, tsconfigRaw:{compilerOptions:{jsx:'react-jsx'}}}; }); }
  if (r && r.oneOf) r.oneOf = fix(r.oneOf);
  return r; });
const serveUrl = await bundle({entryPoint: path.join(dir,'src/index.ts'), publicDir: path.join(dir,'public'),
  webpackOverride: (c) => { c.module.rules = fix(c.module.rules); return c; }});
const binariesDirectory = process.env.RBIN || null; // session #17: /data/media/rbin = gnu ffmpeg + musl compositor (GLIBC 2.34 host)
const inputProps = JSON.parse(process.env.PROPS || '{"matte":true}');
const composition = await selectComposition({serveUrl, id: comp, inputProps, binariesDirectory});
if (mode==='still') await renderStill({composition, serveUrl, output: out, frame: +frame, inputProps, binariesDirectory});
else await renderMedia({composition, serveUrl, codec:'h264', outputLocation: out, inputProps, concurrency: 2, binariesDirectory,
  crf: 16, pixelFormat:'yuv420p', audioCodec:'aac', audioBitrate:'320k',
  onProgress: ({progress}) => { if (Math.round(progress*100)%5===0) process.stdout.write(`\r${Math.round(progress*100)}%`); }});
console.log('\nDONE', out); process.exit(0);
