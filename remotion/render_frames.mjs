// Session #18: compositor-free render. renderFrames -> JPEG sequence, then system ffmpeg stitches + audio.
// Usage (from /data): node Setuchat-Motion/remotion/render_frames.mjs <outDir> [startFrame] [endFrame]
import {bundle} from '@remotion/bundler';
import {renderFrames, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const [outDir='/data/media/out_frames', s, e] = process.argv.slice(2);
const dir = path.dirname(new URL(import.meta.url).pathname);
const fix = (rules) => rules.map(r => {
  if (r && r.use) { const u = Array.isArray(r.use)?r.use:[r.use];
    u.forEach(x => { if (x && typeof x==='object' && String(x.loader).includes('esbuild')) x.options={...x.options, tsconfigRaw:{compilerOptions:{jsx:'react-jsx'}}}; }); }
  if (r && r.oneOf) r.oneOf = fix(r.oneOf);
  return r; });
const serveUrl = await bundle({entryPoint: path.join(dir,'src/index.ts'), publicDir: path.join(dir,'public'),
  webpackOverride: (c) => { c.module.rules = fix(c.module.rules); return c; }});
const inputProps = JSON.parse(process.env.PROPS || '{"matte":false}');
const composition = await selectComposition({serveUrl, id: 'SetuChat', inputProps});
const frameRange = s !== undefined ? [+s, +(e ?? composition.durationInFrames-1)] : null;
let last = 0;
await renderFrames({composition, serveUrl, inputProps, outputDir: outDir, imageFormat: 'jpeg', jpegQuality: 92,
  concurrency: +(process.env.CONC || 2), frameRange, timeoutInMilliseconds: 180000,
  imageSequencePattern: 'f[frame].[ext]',
  onFrameUpdate: (n) => { if (n - last >= 30) { last = n; console.log('frames', n); } }});
console.log('DONE', outDir, composition.durationInFrames); process.exit(0);
